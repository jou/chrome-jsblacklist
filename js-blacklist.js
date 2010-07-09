/* Request blacklist regex source from background.html. Have
 * to do this since we can't communicate with the background page
 * synchronously and we can't prevent the event from the message
 * callback. It might be possible that some JS files has started
 * to load before the event handler is registered.
 */
chrome.extension.sendRequest({}, function(regex) {
	var blacklistRegex, domainRegex;

	function canLoad(url, nodeName) {
		// Initialize lazily to be able to attach event listener ASAP
		if (typeof blacklistRegex == 'undefined') {
			blacklistRegex = regex && new RegExp(regex, 'i');
		}
		if (!domainRegex) {
			domainRegex = new RegExp('http://([^/]+)', 'i');
		}

		if (blacklistRegex && (nodeName === "SCRIPT")) {
			var domainMatches = url.match(domainRegex),
				domain = domainMatches && domainMatches[1];

			return !(domain && domain.match(blacklistRegex));
		}
		return true;
	}

	document.addEventListener("beforeload", function(event) {
		if (!canLoad(event.url, event.target.nodeName)) {
			console.log('blocked script ' + event.url);
			event.preventDefault();
		}
	}, true);
});	
