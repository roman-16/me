use leptos::prelude::*;

#[component]
pub fn Container(children: Children, #[prop(optional)] class: &'static str) -> impl IntoView {
    view! {
        <div class="flex justify-center ".to_owned() + class>
            <div class="max-w-7xl w-full">{children()}</div>
        </div>
    }
}
