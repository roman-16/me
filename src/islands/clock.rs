use js_sys::{
    Array, Date,
    Intl::{
        DateTimeFormat, DateTimeFormatOptions, DateTimeFormatPart, DateTimeFormatPartType, HourCycle, NumericFormat,
    },
};
use leptos::{prelude::*, wasm_bindgen::JsCast};
use std::{fmt, time::Duration};

#[island]
pub fn Clock() -> impl IntoView {
    let time = RwSignal::new(None);
    Effect::new(move || {
        let tick = move || time.set(Some(Time::in_austria()));
        tick();
        set_interval(tick, Duration::from_secs(1));
    });

    view! {
        <p class="py-1.5 px-3.5 font-mono text-xs rounded-2xl border border-dashed sm:text-sm border-line text-balance text-muted">
            {move || match time.get() {
                Some(time) => {
                    view! {
                        "🕐 "
                        <b class="font-semibold text-accent">{time.to_string()}</b>
                        {format!(" in Austria · {}", time.mood())}
                    }
                        .into_any()
                }
                None => "📍 Based in Austria".into_any(),
            }}
        </p>
    }
}

#[derive(Clone, Copy, Debug, PartialEq)]
struct Time {
    hour: u32,
    minute: u32,
}

impl Time {
    fn in_austria() -> Self {
        let options = DateTimeFormatOptions::new();
        options.set_hour(NumericFormat::Numeric);
        options.set_hour_cycle(HourCycle::H23);
        options.set_minute(NumericFormat::Numeric);
        options.set_time_zone("Europe/Vienna");
        let parts = DateTimeFormat::new(&Array::new(), &options).format_to_parts(&Date::new_0());
        let part = |kind| {
            parts
                .iter()
                .map(JsCast::unchecked_into::<DateTimeFormatPart>)
                .find(|part| part.type_() == kind)
                .and_then(|part| String::from(part.value()).parse().ok())
                .unwrap_or_default()
        };

        Self {
            hour: part(DateTimeFormatPartType::Hour),
            minute: part(DateTimeFormatPartType::Minute),
        }
    }

    fn mood(self) -> &'static str {
        match self.hour {
            0..=5 => "probably asleep (or debugging)",
            6..=8 => "probably having coffee",
            9..=16 => "probably at work",
            17..=22 => "probably building side projects",
            _ => "probably still coding",
        }
    }
}

impl fmt::Display for Time {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        write!(formatter, "{:02}:{:02}", self.hour, self.minute)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn displays_hours_and_minutes_with_two_digits() {
        assert_eq!(Time { hour: 7, minute: 5 }.to_string(), "07:05");
    }

    #[test]
    fn mood_follows_the_day() {
        let moods: Vec<_> = [3, 7, 12, 20, 23].map(|hour| Time { hour, minute: 0 }.mood()).into();
        assert_eq!(
            moods,
            [
                "probably asleep (or debugging)",
                "probably having coffee",
                "probably at work",
                "probably building side projects",
                "probably still coding",
            ]
        );
    }
}
