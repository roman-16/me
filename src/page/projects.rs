use super::{
    format::{date, grouped, host},
    section::Section,
};
use crate::profile::Project;
use leptos::prelude::*;

#[component]
pub fn Projects(projects: Vec<Project>) -> impl IntoView {
    (!projects.is_empty()).then(|| {
        view! {
            <Section title="Things I build">
                <div class="grid gap-3 sm:grid-cols-3">
                    {projects.into_iter().map(|project| view! { <ProjectCard project /> }).collect_view()}
                </div>
            </Section>
        }
    })
}

#[component]
fn ProjectCard(project: Project) -> impl IntoView {
    let Project {
        description,
        forks,
        homepage,
        language,
        name,
        release,
        stars,
        url,
    } = project;

    view! {
        <article class="flex relative flex-col gap-2.5 rounded-2xl border transition hover:-translate-y-0.5 p-4.5 border-line bg-card hover:border-accent">
            <h3 class="flex justify-between font-mono font-bold">
                <a class="after:absolute after:inset-0" href={url} target="_blank">
                    {name}
                </a>
                <span class="text-accent" aria-hidden="true">
                    "↗"
                </span>
            </h3>
            {description.map(|description| view! { <p class="text-sm leading-relaxed text-muted">{description}</p> })}
            <p class="flex flex-wrap gap-y-1 gap-x-3 mt-auto text-[13px] text-muted">
                {language
                    .map(|language| {
                        view! {
                            <span class="flex gap-1.5 items-center">
                                <span
                                    class="rounded-full size-2.5"
                                    style={language.color.map(|color| format!("background: {color}"))}
                                />
                                {language.name}
                            </span>
                        }
                    })} <span>"★ " {grouped(stars)}</span>
                {(forks > 0).then(|| view! { <span>"⑂ " {grouped(forks)}</span> })}
                {release
                    .map(|release| {
                        view! {
                            <a class="relative z-10 hover:text-accent" href={release.url} target="_blank">
                                {release.tag}
                                " · "
                                {date(release.date)}
                            </a>
                        }
                    })}
            </p>
            {homepage
                .map(|homepage| {
                    view! {
                        <a
                            class="relative z-10 hover:underline text-[13px] text-accent"
                            href={homepage.clone()}
                            target="_blank"
                        >
                            {host(&homepage).to_owned()}
                        </a>
                    }
                })}
        </article>
    }
}
