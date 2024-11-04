use crate::components::icon::Icon;
use leptos::prelude::*;

#[component]
pub fn Social(
    name: &'static str,
    href: &'static str,
    #[prop(optional)] target: &'static str,
) -> impl IntoView {
    view! {
        <a class="components-social" href=href target=target>
            <Icon name=name />
        </a>
    }
}
