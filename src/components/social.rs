use crate::components::icon::Icon;
use leptos::*;

#[component]
pub fn Social(
    cx: Scope,
    name: &'static str,
    href: &'static str,
    #[prop(optional)] target: &'static str,
) -> impl IntoView {
    view! { cx,
        <a class="components-social" href=href target=target>
          <Icon name=name />
        </a>
    }
}
