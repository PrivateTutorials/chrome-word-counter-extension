// to open options.html file:
// extension icon -> right click -> options
// then you can open its console
console.log('[OPTIONS.js]  Running in options.js');

// argument can also be a simple string, not Obj
chrome.runtime.sendMessage({
    message: 'get_name'
}, response => {
    if (response.message === 'success') {
        // This name was received from BE by our request from FE
        document.querySelector('div span').innerHTML = response.payload;
    }
});
