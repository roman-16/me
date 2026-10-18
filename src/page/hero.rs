use super::socials::Socials;
use crate::{islands::Clock, profile::Status};
use leptos::prelude::*;

#[component]
pub fn Hero(
    avatar: String,
    company: Option<String>,
    location: Option<String>,
    status: Option<Status>,
) -> impl IntoView {
    view! {
        <header class="flex flex-col gap-5 items-center text-center">
            <div class="relative">
                <img
                    class="rounded-full shadow-xl border-3 size-33 border-accent shadow-accent/25 ring-6 ring-accent/15"
                    src={avatar}
                    alt="Roman"
                    width="132"
                    height="132"
                />
                {status
                    .map(|status| {
                        view! {
                            <span class="absolute bottom-1 -right-5 py-1 px-2.5 whitespace-nowrap rounded-full border text-[13px] border-line bg-card text-muted">
                                {status.to_string()}
                            </span>
                        }
                    })}
            </div>
            <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
                "Hi, I'm " <span class="text-accent">"Roman"</span>
            </h1>
            <p class="max-w-xl text-lg leading-relaxed text-muted">
                "A developer with passion." <Whereabouts company location />
            </p>
            <Clock />
            <Socials />
        </header>
    }
}

#[component]
fn Whereabouts(company: Option<String>, location: Option<String>) -> impl IntoView {
    let strong = |text: String| view! { <strong class="font-semibold text-ink">{text}</strong> };

    match (company, location) {
        (Some(company), Some(location)) => view! {
            " Building at "
            {strong(company)}
            ", shipping open source from "
            {strong(location)}
            "."
        }
        .into_any(),
        (Some(company), None) => view! {
            " Building at "
            {strong(company)}
            "."
        }
        .into_any(),
        (None, Some(location)) => view! {
            " Shipping open source from "
            {strong(location)}
            "."
        }
        .into_any(),
        (None, None) => ().into_any(),
    }
}
