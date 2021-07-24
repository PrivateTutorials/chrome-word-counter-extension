// a console, that is opened specifically from popup.html
console.log('[POPUP.js]  Running in popup.js');

// argument can also be a simple string, not Obj
// We are requesting data from BE
chrome.runtime.sendMessage({
    message: 'get_name'
}, response => {
    if (response.message === 'success') {
        // This name was received from BE by our request from FE
        document.querySelector('h3 span').innerHTML = response.payload;
    }
});
