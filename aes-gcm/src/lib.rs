use wasm_bindgen::prelude::*;
use generic_array::GenericArray;
use typenum::U12;
use aes_gcm::{aead::{Aead, AeadCore, KeyInit, OsRng}, Aes256Gcm};

#[wasm_bindgen]
pub fn encrypt(plaintext: Vec<u8>, key: Vec<u8>, nonce: Vec<u8>) -> Vec<u8> {
    let cipher = Aes256Gcm::new_from_slice(&key).unwrap();
    let nonce = GenericArray::<u8, U12>::from_slice(&nonce);
    let ciphertext = cipher.encrypt(nonce, plaintext.as_ref()).unwrap();
    ciphertext
}

#[wasm_bindgen]
pub fn decrypt(ciphertext: Vec<u8>, key: Vec<u8>, nonce: Vec<u8>) -> Vec<u8> {
    let nonce = GenericArray::<u8, U12>::from_slice(&nonce);
    let cipher = Aes256Gcm::new_from_slice(&key).unwrap();
    let plaintext = cipher.decrypt(nonce, ciphertext.as_ref()).unwrap();
    plaintext
}

#[wasm_bindgen]
pub fn generate_key() -> Vec<u8> {
    let key = Aes256Gcm::generate_key(&mut OsRng);
    key.to_vec()
}

#[wasm_bindgen]
pub fn generate_nonce() -> Vec<u8> {
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
    nonce.to_vec()
}
