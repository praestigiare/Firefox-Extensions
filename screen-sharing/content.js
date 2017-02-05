document.body.style.border = "5px solid red";

sessionStorage.getScreenMediaJSExtensionId = browser.runtime.id;

console.log("primeiro passo: " + browser);
console.log("testando tb o atributo completo: " + browser.runtime.id);

console.log("testando tb o sessionStorage " + sessionStorage);

/* The browser content script which can listen to the page dom events */
var channel = browser.runtime.connect();
channel.onMessage.addListener(function (message) {
    console.log('Janus extension channel message', message);
    window.postMessage(message, '*');
});

window.addEventListener('message', function (event) {
    if (event.source != window)
        return;
    if (!event.data && (
			event.data.type == 'janusGetScreen' ||
			event.data.type == 'janusCancelGetScreen'))
        return;
    channel.postMessage(event.data);
});


var div = document.createElement('div');
div.id = "janus-extension-installed";
div.style = "display: none;";
document.body.appendChild(div);
