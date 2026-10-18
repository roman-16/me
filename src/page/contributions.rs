use super::{
    format::{date, plural},
    section::Section,
};
use crate::profile::{Calendar, Day, Level};
use chrono::Datelike;
use leptos::prelude::*;

const LEVELS: [Level; 5] = [
    Level::None,
    Level::FirstQuartile,
    Level::SecondQuartile,
    Level::ThirdQuartile,
    Level::FourthQuartile,
];

#[component]
pub fn Contributions(calendar: Calendar) -> impl IntoView {
    let columns = format!(
        "grid-template-columns: repeat({}, minmax(0, 1fr))",
        calendar.weeks.len()
    );
    let first_row = calendar
        .days()
        .next()
        .map(|day| format!("grid-row-start: {}", day.date.weekday().num_days_from_sunday() + 1));
    let busiest = calendar.busiest_day().map(|day| {
        format!(
            "Busiest day: {}, {}",
            date(day.date),
            plural(day.contributions, "contribution")
        )
    });

    view! {
        <Section title="Contributions">
            <figure class="p-5 rounded-2xl border border-line bg-card">
                <div class="flex overflow-x-auto flex-row-reverse">
                    <div class="grow min-w-176">
                        <div class="grid mb-1.5 text-[11px] text-muted" style={columns.clone()} aria-hidden="true">
                            {calendar
                                .months()
                                .map(|(week, date)| {
                                    view! {
                                        <span
                                            class="whitespace-nowrap"
                                            style={format!("grid-column-start: {}", week + 1)}
                                        >
                                            {date.format("%b").to_string()}
                                        </span>
                                    }
                                })
                                .collect_view()}
                        </div>
                        <div
                            class="grid grid-flow-col grid-rows-7 gap-[3px]"
                            style={columns}
                            role="img"
                            aria-label={format!("{} in the last year", plural(calendar.total, "contribution"))}
                        >
                            {calendar
                                .days()
                                .enumerate()
                                .map(|(index, day)| day_cell(day, first_row.clone().filter(|_| index == 0)))
                                .collect_view()}
                        </div>
                    </div>
                </div>
                <figcaption class="flex flex-wrap gap-2 justify-between items-center mt-3 text-xs text-muted">
                    <span>{busiest}</span>
                    <span class="flex items-center gap-[3px]" aria-hidden="true">
                        "Less "
                        {LEVELS
                            .map(|level| {
                                view! { <span class={format!("size-[11px] rounded-[3px] {}", fill(level))} /> }
                            })}
                        " More"
                    </span>
                </figcaption>
            </figure>
        </Section>
    }
}

fn day_cell(day: &Day, style: Option<String>) -> impl IntoView + use<> {
    view! {
        <span
            class={format!("aspect-square rounded-[3px] {}", fill(day.level))}
            style={style}
            title={format!("{} on {}", plural(day.contributions, "contribution"), day.date.format("%a, %d.%m.%Y"))}
        />
    }
}

fn fill(level: Level) -> &'static str {
    match level {
        Level::None => "bg-level-0",
        Level::FirstQuartile => "bg-level-1",
        Level::SecondQuartile => "bg-level-2",
        Level::ThirdQuartile => "bg-level-3",
        Level::FourthQuartile => "bg-level-4",
    }
}
