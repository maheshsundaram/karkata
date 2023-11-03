import {
  init,
  encryptString,
  decryptString,
  generateKey,
  generateNonce,
} from "./crypto.js";

addEventListener("DOMContentLoaded", async () => {
  await init();
  const generatedKey = generateKey();
  const generatedNonce = generateNonce();

  const key = document.getElementById("key");
  if (key) key.innerHTML = generatedKey;
  const nonce = document.getElementById("nonce");
  if (nonce) nonce.innerHTML = generatedNonce;

  const encryptButton = document.getElementById("encrypt");
  const decryptButton = document.getElementById("decrypt");
  // prettier-ignore
  const encryptPlaintextInput = document.getElementById("encrypt-plaintext") as HTMLInputElement;
  // prettier-ignore
  const decryptPlaintextInput = document.getElementById("decrypt-plaintext") as HTMLInputElement;
  const encryptedOutput = document.getElementById("encrypted-output");
  const decryptedOutput = document.getElementById("decrypted-output");

  encryptButton?.addEventListener("click", () => {
    if (encryptPlaintextInput?.value && encryptedOutput) {
      // prettier-ignore
      const output = encryptString(encryptPlaintextInput.value, generatedKey, generatedNonce);
      encryptedOutput.innerHTML = output;
      if (decryptPlaintextInput) decryptPlaintextInput.innerText = output;
    }
  });

  decryptButton?.addEventListener("click", () => {
    if (decryptPlaintextInput?.value && decryptedOutput) {
      // prettier-ignore
      const output = decryptString(decryptPlaintextInput.value, generatedKey, generatedNonce);
      if (decryptedOutput) decryptedOutput.innerHTML = output;
    }
  });
});
