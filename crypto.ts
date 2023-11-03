import init, {
  generate_key,
  generate_nonce,
  encrypt,
  decrypt,
} from "./aes-gcm/pkg/aes_gcm_wasm.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export { init };

export const fromUint8ArrayToHexString = (array: Uint8Array): string => {
  let result = "";

  for (var i = 0; i < array.length; i++) {
    const value = array[i].toString(16);
    result += value.length === 1 ? "0" + value : value;
  }

  return result;
};

export const fromHexToUint8Array = (hexStr: string): Uint8Array => {
  const result = [];
  for (var i = 0; i < hexStr.length; i += 2) {
    result.push(parseInt(hexStr.substr(i, 2), 16));
  }
  return new Uint8Array(result);
};

export const generateKey = (): string => {
  const buf = generate_key();
  return fromUint8ArrayToHexString(buf);
};

export const generateNonce = (): string => {
  const buf = generate_nonce();
  return fromUint8ArrayToHexString(buf);
};

export const encryptString = (
  plaintext: string,
  key: string,
  nonce: string
): string => {
  const _key = fromHexToUint8Array(key);
  const _nonce = fromHexToUint8Array(nonce);
  const _plaintext = encoder.encode(plaintext);
  const secret = encrypt(_plaintext, _key, _nonce);
  const _secret = fromUint8ArrayToHexString(secret);
  return _secret;
};

export const decryptString = (
  ciphertext: string,
  key: string,
  nonce: string
): string => {
  const _key = fromHexToUint8Array(key);
  const _nonce = fromHexToUint8Array(nonce);
  const _ciphertext = fromHexToUint8Array(ciphertext);
  const secret = decrypt(_ciphertext, _key, _nonce);
  const _secret = decoder.decode(secret);
  return _secret;
};
