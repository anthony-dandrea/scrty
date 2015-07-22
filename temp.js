function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function addPasswordToCookie(key, password) {
  /* Expected cookie format:
	 *		user: <LaunchKey_user_info>,
	 *		passwords: {
	 *				<service_name1>: <encrypted_password1>,
	 *				<service_name2>: <encrypted_password2>,
	 *				<service_nameN>: <encrypted_passwordN>,
	 *		}
	 */
	var curCookie = JSON.parse(document.cookie);
	curCookie.passwords[key] = password;
	document.cookie = JSON.stringify(curCookie)
}
