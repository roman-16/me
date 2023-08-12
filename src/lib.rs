mod components;

use crate::components::social::Social;
use leptos::*;

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    view! { cx,
        <div class="lib">
            <div class="header">"Hi!"</div>
            <div class="introduction">"I'm "<span>"Roman"</span>", a developer with passion."</div>
            <div class="socials">
                <Social name="mail" href="mailto:rl16@posteo.net" />
                <Social name="github" href="https://github.com/roman-16" target="_blank" />
                <Social name="linkedin" href="https://linkedin.com/in/roman-lerchster" target="_blank" />
                <Social name="instagram" href="https://instagram.com/roman.lerc" target="_blank" />
            </div>
            <div class="code-info">"You can view the source code of this website "<a href="https://github.com/roman-16/me" target="_blank">"here"</a>" (it is written in Rust)."</div>
        </div>
    }
}
