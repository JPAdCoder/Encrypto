function getAES(data, key, iv, mode, padding) {
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: mode,
        padding: padding
    });
    return encrypted.toString();
}

function getDAes(encrypted, key, iv, mode, padding) {
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: mode,
        padding: padding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}