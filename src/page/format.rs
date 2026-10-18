use chrono::NaiveDate;

pub fn avatar_at(url: &str, size: u32) -> String {
    let separator = if url.contains('?') { '&' } else { '?' };
    format!("{url}{separator}s={size}")
}

pub fn date(date: NaiveDate) -> String {
    date.format("%d.%m.%Y").to_string()
}

pub fn grouped(number: impl ToString) -> String {
    let digits = number.to_string();
    let mut grouped = String::with_capacity(digits.len() + digits.len() / 3);
    for (index, digit) in digits.chars().enumerate() {
        if index > 0 && (digits.len() - index).is_multiple_of(3) {
            grouped.push(',');
        }
        grouped.push(digit);
    }
    grouped
}

pub fn host(url: &str) -> &str {
    let without_scheme = url.split_once("://").map_or(url, |(_, rest)| rest);
    without_scheme.split('/').next().unwrap_or(without_scheme)
}

pub fn plural(count: u32, singular: &str) -> String {
    match count {
        0 => format!("No {singular}s"),
        1 => format!("1 {singular}"),
        _ => format!("{} {singular}s", grouped(count)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn avatar_at_appends_the_size() {
        assert_eq!(avatar_at("https://a.test/u/1?v=4", 64), "https://a.test/u/1?v=4&s=64");
        assert_eq!(avatar_at("https://a.test/u/1", 64), "https://a.test/u/1?s=64");
    }

    #[test]
    fn date_is_day_month_year() {
        assert_eq!(date(NaiveDate::from_ymd_opt(2026, 7, 4).unwrap()), "04.07.2026");
    }

    #[test]
    fn grouped_separates_thousands() {
        assert_eq!(
            [0, 999, 4958, 216467, 1000000].map(grouped),
            ["0", "999", "4,958", "216,467", "1,000,000"]
        );
    }

    #[test]
    fn host_strips_scheme_and_path() {
        assert_eq!(
            host("https://extensions.gnome.org/extension/10343/murmur/"),
            "extensions.gnome.org"
        );
        assert_eq!(host("proton-cli.lerchster.dev"), "proton-cli.lerchster.dev");
    }

    #[test]
    fn plural_names_the_count() {
        assert_eq!(
            [0, 1, 1200].map(|count| plural(count, "contribution")),
            ["No contributions", "1 contribution", "1,200 contributions"]
        );
    }
}
