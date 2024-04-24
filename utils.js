function checkName(n1, n2) {
    if (n1 === "" || n2 === "") return null;

    let same = 0,
        maxLength = Math.min(n1.length, n2.length),
        threshold = 0.6 * Math.max(n1.length, n2.length),
        commonPart = "";

    for (let i = 0; i < maxLength; i++) {
        if (n1[i] === n2[i]) {
            commonPart += n1[i];
            same++;
        } else {
            break; // Thoát khỏi vòng lặp nếu gặp ký tự khác nhau
        }
    }

    return same >= threshold ? commonPart : null;
}