# lerchster.dev

Roman's homepage: profile, GitHub stats, contribution graph and pinned projects. Rust and [Leptos](https://leptos.dev) render it to static HTML at build time; the live clock and the easter egg run as WebAssembly islands.

## Development

Enter the dev shell with `direnv allow` or `nix develop`, then:

| Command | Does |
| --- | --- |
| `just build` | Fetches the GitHub data and builds the release site into `target/site` |
| `just check` | Format check, clippy and tests |
| `just data` | Fetches the GitHub data into `target/github.json` (needs `gh auth login`) |
| `just dev` | Fetches the GitHub data if missing and serves the site with live reload on http://localhost:3000 |
| `just fmt` | Formats the code |

## Deployment

The `Pages` workflow builds the site and publishes it to GitHub Pages on every push to `main`, daily at 04:00 UTC to refresh the GitHub data, and on demand via **Run workflow**.
