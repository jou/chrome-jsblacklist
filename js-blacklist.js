document.addEventListener("beforeload", beforeLoadListener, true);

function beforeLoadListener(event) {
	chrome.extension.sendRequest({url: event.url, nodeName: event.target.nodeName}, 
		function(canLoad) {
			if (!canLoad) {
				console.log('blocked script ' + event.url);
				event.preventDefault();
			}
		}
	);
}
 
