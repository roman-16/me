use hydration_context::SsrSharedContext;
use leptos::{config::get_configuration, prelude::*};
use me::{page::Document, profile::Profile};
use std::{error::Error, fs, path::Path, sync::Arc};

const GITHUB_DATA: &str = "target/github.json";

fn main() -> Result<(), Box<dyn Error>> {
    let options = get_configuration(Some("Cargo.toml"))?.leptos_options;
    let profile = Profile::load(Path::new(GITHUB_DATA))?;
    let index = Path::new(options.site_root.as_ref()).join("index.html");

    let html = Owner::new_root(Some(Arc::new(SsrSharedContext::new_islands())))
        .with(|| view! { <Document options profile /> }.to_html());

    fs::write(index, html)?;
    Ok(())
}
