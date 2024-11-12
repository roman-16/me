use crate::shared::components::Container;
use leptos::prelude::*;

#[component]
pub fn NavBar() -> impl IntoView {
    view! {
        <Container class="h-14 border-b backdrop-blur">
            <div class="flex justify-between">
                <div>RL</div>
                <div>Bar</div>
            </div>
        </Container>
    }
}
