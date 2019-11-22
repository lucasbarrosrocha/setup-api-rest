module.exports = function (length, letters) {
    let code = "";
    let possible = "";
    if (letters) {
        possible = "ABCDEFGHIJKLMNOPQRSUTVXYWZ0123456789";
    } else {
        possible = "0123456789";
    }

    for (let i = 0; i < length; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));

    return code;
};
