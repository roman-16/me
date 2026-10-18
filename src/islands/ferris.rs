use leptos::{ev, prelude::*};
use std::collections::VecDeque;

const KONAMI: [&str; 10] = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a",
];

#[island]
pub fn Ferris() -> impl IntoView {
    let scuttling = RwSignal::new(false);
    let keys = StoredValue::new(VecDeque::with_capacity(KONAMI.len()));
    let listener = window_event_listener(ev::keydown, move |event| {
        if completes_konami(&mut keys.write_value(), &event.key()) {
            scuttling.set(true);
        }
    });
    on_cleanup(move || listener.remove());

    view! {
        <Show when={move || scuttling.get()}>
            <div
                class="flex fixed left-0 bottom-6 items-center pointer-events-none motion-reduce:hidden animate-scuttle"
                aria-hidden="true"
                on:animationend={move |_| scuttling.set(false)}
            >
                <span class="w-32 h-1 from-transparent rounded-full bg-linear-to-r to-accent" />
                <span class="text-5xl animate-bounce">"🦀"</span>
            </div>
        </Show>
    }
}

fn completes_konami(keys: &mut VecDeque<String>, key: &str) -> bool {
    if keys.len() == KONAMI.len() {
        keys.pop_front();
    }
    keys.push_back(key.to_lowercase());

    let completed = keys.iter().map(String::as_str).eq(KONAMI);
    if completed {
        keys.clear();
    }
    completed
}

#[cfg(test)]
mod tests {
    use super::*;

    const SEQUENCE: [&str; 10] = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ];

    fn type_keys<'a>(keys: impl IntoIterator<Item = &'a str>) -> Vec<bool> {
        let mut typed = VecDeque::new();
        keys.into_iter().map(|key| completes_konami(&mut typed, key)).collect()
    }

    #[test]
    fn completes_on_the_last_key() {
        let results = type_keys(SEQUENCE);
        assert_eq!(results.iter().filter(|&&completed| completed).count(), 1);
        assert!(results[9]);
    }

    #[test]
    fn completes_after_extra_keys_before_the_sequence() {
        assert!(type_keys(["ArrowUp", "x"].into_iter().chain(SEQUENCE)).pop().unwrap());
    }

    #[test]
    fn ignores_letter_case() {
        let mut keys = SEQUENCE;
        keys[8] = "B";
        keys[9] = "A";
        assert!(type_keys(keys).pop().unwrap());
    }

    #[test]
    fn does_not_complete_with_a_wrong_key() {
        let mut keys = SEQUENCE;
        keys[4] = "ArrowRight";
        assert!(!type_keys(keys).pop().unwrap());
    }

    #[test]
    fn needs_the_whole_sequence_again_after_completing() {
        assert!(!type_keys(SEQUENCE.into_iter().chain(["b", "a"])).pop().unwrap());
    }
}
