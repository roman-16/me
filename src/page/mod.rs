mod contributions;
mod footer;
mod format;
mod hero;
mod projects;
mod section;
mod socials;
mod stats;

use crate::{islands::Ferris, profile::Profile};
use contributions::Contributions;
use footer::Footer;
use format::avatar_at;
use hero::Hero;
use leptos::prelude::*;
use leptos_meta::HashedStylesheet;
use projects::Projects;
use stats::Stats;

const DESCRIPTION: &str = "Developer with passion from Austria - projects, open source and what I'm building.";
const NAME: &str = "Roman Lerchster";
const URL: &str = "https://lerchster.dev";

#[component]
pub fn Document(options: LeptosOptions, profile: Profile) -> impl IntoView {
    let avatar = |size| avatar_at(&profile.avatar_url, size);

    view! {
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{NAME}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="theme-color" content="#f87d1c" />
                {open_graph("og:description", DESCRIPTION.to_owned())}
                {open_graph("og:image", avatar(460))}
                {open_graph("og:title", NAME.to_owned())}
                {open_graph("og:type", "website".to_owned())}
                {open_graph("og:url", URL.to_owned())}
                <link rel="apple-touch-icon" href={avatar(180)} />
                <link rel="icon" href={avatar(64)} />
                <HashedStylesheet options={options.clone()} />
                <HydrationScripts options={options.clone()} islands=true />
                <AutoReload options />
            </head>
            <body class="antialiased bg-page text-ink">
                <Page profile />
            </body>
        </html>
    }
}

fn open_graph(property: &'static str, content: String) -> impl IntoView {
    leptos::html::meta().attr("property", property).content(content)
}

#[component]
fn Page(profile: Profile) -> impl IntoView {
    let Profile {
        avatar_url,
        calendar,
        company,
        location,
        merged_pull_requests,
        projects,
        stars,
        status,
    } = profile;
    let updated = calendar.updated();

    view! {
        <div class="fixed inset-x-0 -top-64 pointer-events-none h-128 glow" aria-hidden="true" />
        <main class="relative px-6 pt-16 pb-10 mx-auto max-w-4xl sm:pt-20">
            <Hero avatar={avatar_at(&avatar_url, 264)} company location status />
            <Stats contributions={calendar.total} merged_pull_requests stars streak={calendar.streak()} />
            <Contributions calendar />
            <Projects projects />
            <Footer updated />
        </main>
        <Ferris />
    }
}
