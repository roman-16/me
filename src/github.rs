use crate::profile::{Calendar, Day, Language, Profile, Project, Release, Status};
use chrono::{DateTime, Utc};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Response {
    data: Data,
}

#[derive(Deserialize)]
struct Data {
    user: User,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct User {
    avatar_url: String,
    company: Option<String>,
    contributions_collection: ContributionsCollection,
    location: Option<String>,
    login: String,
    pinned_items: Nodes<Repository>,
    pull_requests: Count,
    repositories: Nodes<Stars>,
    status: Option<UserStatus>,
}

#[derive(Deserialize)]
struct Nodes<T> {
    nodes: Vec<T>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Count {
    total_count: u32,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Stars {
    stargazer_count: u32,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ContributionsCollection {
    contribution_calendar: ContributionCalendar,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ContributionCalendar {
    total_contributions: u32,
    weeks: Vec<Week>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Week {
    contribution_days: Vec<Day>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Repository {
    description: Option<String>,
    fork_count: u32,
    homepage_url: Option<String>,
    latest_release: Option<LatestRelease>,
    name: String,
    owner: Owner,
    primary_language: Option<Language>,
    stargazer_count: u32,
    url: String,
}

#[derive(Deserialize)]
struct Owner {
    login: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct LatestRelease {
    published_at: DateTime<Utc>,
    tag_name: String,
    url: String,
}

#[derive(Deserialize)]
struct UserStatus {
    emoji: Option<String>,
    message: Option<String>,
}

impl From<Response> for Profile {
    fn from(response: Response) -> Self {
        let user = response.data.user;
        let login = user.login;
        let calendar = user.contributions_collection.contribution_calendar;

        Self {
            avatar_url: user.avatar_url,
            calendar: Calendar {
                total: calendar.total_contributions,
                weeks: calendar.weeks.into_iter().map(|week| week.contribution_days).collect(),
            },
            company: user.company.map(|company| company.trim_start_matches('@').to_owned()),
            location: user.location,
            merged_pull_requests: user.pull_requests.total_count,
            projects: user
                .pinned_items
                .nodes
                .into_iter()
                .map(|repository| Project {
                    description: repository.description,
                    forks: repository.fork_count,
                    homepage: repository.homepage_url.filter(|url| !url.is_empty()),
                    language: repository.primary_language,
                    name: if repository.owner.login == login {
                        repository.name
                    } else {
                        format!("{}/{}", repository.owner.login, repository.name)
                    },
                    release: repository.latest_release.map(|release| Release {
                        date: release.published_at.date_naive(),
                        tag: release.tag_name,
                        url: release.url,
                    }),
                    stars: repository.stargazer_count,
                    url: repository.url,
                })
                .collect(),
            stars: user
                .repositories
                .nodes
                .iter()
                .map(|repository| repository.stargazer_count)
                .sum(),
            status: user.status.and_then(|status| {
                Status::new(
                    status
                        .emoji
                        .and_then(|code| emojis::get_by_shortcode(code.trim_matches(':')))
                        .map(|emoji| emoji.as_str().to_owned()),
                    status.message.filter(|message| !message.is_empty()),
                )
            }),
        }
    }
}
