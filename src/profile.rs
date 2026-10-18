use crate::github::Response;
use chrono::{Datelike, NaiveDate};
use serde::Deserialize;
use std::{fmt, fs, path::Path};

pub struct Profile {
    pub avatar_url: String,
    pub calendar: Calendar,
    pub company: Option<String>,
    pub location: Option<String>,
    pub merged_pull_requests: u32,
    pub projects: Vec<Project>,
    pub stars: u32,
    pub status: Option<Status>,
}

impl Profile {
    pub fn load(path: &Path) -> Result<Self, String> {
        let json = fs::read_to_string(path)
            .map_err(|error| format!("Cannot read {}: {error}. Run `just data` first.", path.display()))?;
        let response: Response = serde_json::from_str(&json)
            .map_err(|error| format!("{} is not a GitHub profile response: {error}", path.display()))?;
        Ok(response.into())
    }
}

pub struct Calendar {
    pub total: u32,
    pub weeks: Vec<Vec<Day>>,
}

impl Calendar {
    pub fn days(&self) -> impl DoubleEndedIterator<Item = &Day> {
        self.weeks.iter().flatten()
    }

    pub fn busiest_day(&self) -> Option<&Day> {
        self.days().filter(|day| day.contributions > 0).reduce(|busiest, day| {
            if day.contributions > busiest.contributions {
                day
            } else {
                busiest
            }
        })
    }

    pub fn months(&self) -> impl Iterator<Item = (usize, NaiveDate)> {
        self.weeks
            .iter()
            .enumerate()
            .filter_map(|(week, days)| days.iter().find(|day| day.date.day() == 1).map(|day| (week, day.date)))
    }

    pub fn streak(&self) -> usize {
        let mut days = self.days().rev().peekable();
        days.next_if(|day| day.contributions == 0);
        days.take_while(|day| day.contributions > 0).count()
    }

    pub fn updated(&self) -> Option<NaiveDate> {
        self.days().last().map(|day| day.date)
    }
}

#[derive(Deserialize)]
pub struct Day {
    #[serde(rename = "contributionCount")]
    pub contributions: u32,
    pub date: NaiveDate,
    #[serde(rename = "contributionLevel")]
    pub level: Level,
}

#[derive(Clone, Copy, Debug, Deserialize, PartialEq)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum Level {
    None,
    FirstQuartile,
    SecondQuartile,
    ThirdQuartile,
    FourthQuartile,
}

pub struct Project {
    pub description: Option<String>,
    pub forks: u32,
    pub homepage: Option<String>,
    pub language: Option<Language>,
    pub name: String,
    pub release: Option<Release>,
    pub stars: u32,
    pub url: String,
}

#[derive(Deserialize)]
pub struct Language {
    pub color: Option<String>,
    pub name: String,
}

pub struct Release {
    pub date: NaiveDate,
    pub tag: String,
    pub url: String,
}

#[derive(Debug, PartialEq)]
pub struct Status {
    emoji: Option<String>,
    message: Option<String>,
}

impl Status {
    pub fn new(emoji: Option<String>, message: Option<String>) -> Option<Self> {
        (emoji.is_some() || message.is_some()).then_some(Self { emoji, message })
    }
}

impl fmt::Display for Status {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        let parts: Vec<&str> = [&self.emoji, &self.message]
            .into_iter()
            .flatten()
            .map(String::as_str)
            .collect();
        formatter.write_str(&parts.join(" "))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn calendar(contributions: &[u32]) -> Calendar {
        let start = NaiveDate::from_ymd_opt(2026, 9, 27).unwrap();
        let days: Vec<Day> = contributions
            .iter()
            .zip(start.iter_days())
            .map(|(&contributions, date)| Day {
                contributions,
                date,
                level: if contributions == 0 {
                    Level::None
                } else {
                    Level::FirstQuartile
                },
            })
            .collect();
        let mut weeks = vec![];
        let mut days = days.into_iter().peekable();
        while days.peek().is_some() {
            weeks.push(days.by_ref().take(7).collect());
        }
        Calendar {
            total: contributions.iter().sum(),
            weeks,
        }
    }

    #[test]
    fn streak_counts_consecutive_days_up_to_today() {
        assert_eq!(calendar(&[1, 0, 3, 2, 5]).streak(), 3);
    }

    #[test]
    fn streak_continues_through_today_without_contributions() {
        assert_eq!(calendar(&[0, 4, 4, 0]).streak(), 2);
    }

    #[test]
    fn streak_is_zero_after_two_days_without_contributions() {
        assert_eq!(calendar(&[4, 0, 0]).streak(), 0);
    }

    #[test]
    fn busiest_day_is_the_first_day_with_the_most_contributions() {
        let calendar = calendar(&[2, 9, 1, 9]);
        let busiest = calendar.busiest_day().unwrap();
        assert_eq!((busiest.contributions, busiest.date.day()), (9, 28));
    }

    #[test]
    fn busiest_day_is_none_without_contributions() {
        assert!(calendar(&[0, 0]).busiest_day().is_none());
    }

    #[test]
    fn months_start_in_the_week_containing_the_first() {
        let months: Vec<_> = calendar(&[0; 63])
            .months()
            .map(|(week, date)| (week, date.month()))
            .collect();
        assert_eq!(months, [(0, 10), (5, 11)]);
    }

    #[test]
    fn updated_is_the_last_day() {
        assert_eq!(calendar(&[0; 10]).updated(), NaiveDate::from_ymd_opt(2026, 10, 6));
    }

    #[test]
    fn status_joins_emoji_and_message() {
        let status = Status::new(Some("🖥️".into()), Some("Coding".into())).unwrap();
        assert_eq!(status.to_string(), "🖥️ Coding");
    }

    #[test]
    fn status_is_none_when_empty() {
        assert_eq!(Status::new(None, None), None);
    }
}
