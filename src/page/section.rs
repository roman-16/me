use leptos::prelude::*;

#[component]
pub fn Section(title: &'static str, children: Children) -> impl IntoView {
    view! {
        <section class="mt-16">
            <h2 class="mb-4 font-semibold uppercase text-[13px] tracking-[0.14em] text-muted">{title}</h2>
            {children()}
        </section>
    }
}
