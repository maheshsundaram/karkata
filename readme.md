# Karkata

A demonstration of using a Rust crate in Typescript/Javascript by compiling to WASM.

Uses
- wasm-bindgen
- wasm-pack
- RustCrypto AES-GCM

Requires
- rust toolchain
- npm

Build Steps
- `npx -p typescript tsc --module esnext --outDir . *.ts`
- `cd aes-gcm && wasm-pack build --target web`
