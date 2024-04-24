function checkName(n1, n2) {
    if (n1 === "" || n2 === "") return null;

    let same = 0,
        maxLength = Math.max(n1.length, n2.length);

    for (let i = 0; i < maxLength; i++) {
        if (n1[i] === n2[i]) {
            same++;
        }
    }

    let similarity = same / maxLength;
    return similarity > 0.6 ? n1.substring(0, same) : null;
}