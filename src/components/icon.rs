use leptos::prelude::*;

#[component]
pub fn Icon(name: &'static str) -> impl IntoView {
    view! {
        <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <use_ href=format!("{}{}", "/public/icons.svg#", name) />
        </svg>
    }
}
