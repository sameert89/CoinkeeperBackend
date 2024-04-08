const crypto = require("crypto");

function encrypt(data) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const key = Buffer.from(process.env.DEK, "base64"); // Encryption key
  let cipher = crypto.createCipheriv("aes-256-cbc", key, iv); // Create cipher
  let encrypted = cipher.update(data, "utf8", "base64"); // Encrypt the data
  encrypted += cipher.final("base64"); // Finalize the encryption and append any remaining encrypted data
  return {
    iv: iv.toString("base64"),
    encryptedData: encrypted,
  };
}

function decrypt(data) {
  let iv = Buffer.from(data.iv, "base64"); // Convert iv back to buffer
  let encryptedText = Buffer.from(data.encryptedData, "base64"); // Convert encrypted data back to buffer
  const key = Buffer.from(process.env.DEK, "base64"); // Decryption key
  let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv); // Create decipher
  let decrypted = decipher.update(encryptedText); // Decrypt the data
  decrypted = Buffer.concat([decrypted, decipher.final()]); // Finalize decryption and concatenate any remaining decrypted data
  return decrypted.toString();
}

function deterministicHash(data) {
  const hash = crypto.createHash("sha512");
  hash.update(data);
  return hash.digest("base64");
}

module.exports = { encrypt, decrypt, deterministicHash };
