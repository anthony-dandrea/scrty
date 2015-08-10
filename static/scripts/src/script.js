function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function setCookie(key, value) {
    document.cookie = key + '=' + value + ';';
}

function cookieValue(key) {
    var regexKey = "^(?:.*;)?"+key+"=([^;]+)(?:.*)?$"
    regexKey = new RegExp(regexKey);
    return (document.cookie.match(regexKey)||[,null])[1];
}
