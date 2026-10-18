pub mod islands;
#[cfg(feature = "ssr")]
pub mod page;
#[cfg(feature = "ssr")]
pub mod profile;

#[cfg(feature = "ssr")]
mod github;

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    console_error_panic_hook::set_once();
    leptos::mount::hydrate_islands();
}
