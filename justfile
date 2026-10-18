github_data := "target/github.json"

build: data
    cargo leptos build --release
    target/release/me

check:
    leptosfmt --check src
    cargo fmt --check
    cargo clippy --all-targets --features ssr -- --deny warnings
    cargo clippy --lib --features hydrate --target wasm32-unknown-unknown -- --deny warnings
    cargo test --features ssr

data:
    mkdir --parents target
    gh api graphql --field query=@src/github.graphql --raw-field login=roman-16 > {{ github_data }}.part
    mv {{ github_data }}.part {{ github_data }}

dev:
    #!/usr/bin/env bash
    set -o errexit -o nounset -o pipefail
    [ -f {{ github_data }} ] || just data
    mkdir --parents target/site
    miniserve --index index.html --port 3000 target/site &
    trap 'kill $!' EXIT
    cargo leptos watch

fmt:
    leptosfmt src
    cargo fmt
