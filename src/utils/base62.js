const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function encodeBase62(num) {
    let base = characters.length;
    let encoded = "";

    while (num > 0) {
        encoded = characters[num % base] + encoded;
        num = Math.floor(num / base);
    }

    return encoded || "a";
}

module.exports = encodeBase62;
