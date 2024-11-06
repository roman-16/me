mod components;
mod shared;

use crate::components::*;
use leptos::prelude::*;

#[component]
pub fn App() -> impl IntoView {
    view! {
        <div>
            <NavBar />
            <div class="header">"Hi!"</div>
            <div class="introduction">"I'm "<span>"Roman"</span>", a developer with passion."</div>
            <div class="socials">
                <Social name="mail" href="mailto:roman@lerchster.dev" />
                <Social name="github" href="https://github.com/roman-16" target="_blank" />
                <Social
                    name="linkedin"
                    href="https://linkedin.com/in/roman-lerchster"
                    target="_blank"
                />
                <Social name="instagram" href="https://instagram.com/roman.lerc" target="_blank" />
            </div>
            <div class="code-info">
                "You can view the source code of this website "
                <a href="https://github.com/roman-16/me" target="_blank">
                    "here"
                </a>" (it is written in Rust)."
            </div>
        </div>
    }
}
