use super::{format::grouped, section::Section};
use leptos::prelude::*;

#[component]
pub fn Stats(contributions: u32, merged_pull_requests: u32, stars: u32, streak: usize) -> impl IntoView {
    let streak = if streak > 0 {
        format!("{} 🔥", grouped(streak))
    } else {
        "0".to_owned()
    };

    view! {
        <Section title="Last year on GitHub">
            <dl class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="contributions" value={grouped(contributions)} />
                <Stat label="day streak" value={streak} />
                <Stat label="pull requests merged" value={grouped(merged_pull_requests)} />
                <Stat label="stars on my repos" value={format!("{} ★", grouped(stars))} />
            </dl>
        </Section>
    }
}

#[component]
fn Stat(label: &'static str, value: String) -> impl IntoView {
    view! {
        <div class="flex flex-col-reverse rounded-2xl border p-4.5 border-line bg-card">
            <dt class="text-sm text-muted">{label}</dt>
            <dd class="font-mono text-3xl font-bold">{value}</dd>
        </div>
    }
}
