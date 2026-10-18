use super::format::date;
use chrono::NaiveDate;
use leptos::prelude::*;

#[component]
pub fn Footer(updated: Option<NaiveDate>) -> impl IntoView {
    view! {
        <footer class="flex flex-wrap gap-2 justify-between pt-6 border-t mt-18 text-[13px] border-line text-muted">
            <p>
                "Written in Rust 🦀 with Leptos, compiled to WebAssembly · "
                <a class="hover:underline text-accent" href="https://github.com/roman-16/me" target="_blank">
                    "Source"
                </a>
            </p>
            {updated.map(|updated| view! { <p>"GitHub data from " {date(updated)}</p> })}
        </footer>
    }
}
