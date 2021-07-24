// It's a service worker - File that runs when it's needed
// before in manifest version 2, we could be sure that any data in this file will be saved in state forever

// but now, since it's a service worker - the file is being deleted as soon, as it's not needed
// thus - state is being deleted with it
// In order to save state - we'll be using storage (saving on local hard drive)

// foreground console can be opened here, but only once after the widget was re-uploaded to Chrome extensions page:
// 1) opened console in popup.html
// 2) Chrome extensions page -> service worker link
console.log('[BACKGROUND.js]  Running in background.js');

// Important: this is a default state of your extension and runs only once
// onInstalled - when plugin is being installed in Chrome browser extension page
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({name: 'Igor'})
});

// tabs - is from manifest.json/permissions
// onUpdated - when google tab or website is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, actualTabInfo) => {
    if (
        changeInfo.status === 'complete'
        && /^http/.test(actualTabInfo.url) // regExp to test if we open a real website, but not chrome browser tab locally
    ) {
        // we inject CSS files in such a way to the opened website
        chrome.scripting.insertCSS({
            // target - where to inject the script
            target: {tabId},
            files: ['./foreground.css']
        }).then(() => {
            // scripting - is from manifest.json/permissions
            // we inject JS files in such a way to the opened website
            chrome.scripting.executeScript({
                // target - where to inject the script
                target: {tabId},
                files: ['./foreground.js']
            }).then(() => { // what to do after it's successfully injected
                console.log('[BACKGROUND.js] INJECTED FOREGROUND SCRIPT into users page (to FE)');

                // we can already send messages from here to FE, after tab initially loaded
                /*chrome.tabs.sendMessage(tabId,
                    {
                        message: 'change_name',
                        payload: 'IgorUpdatedOnTabOpen'
                    }
                );*/
            })
        }).catch(err => {
            console.log(err);
        })
    }
});

// listening to message from FE
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_name') {
        // to get a couple of properties:
        // chrome.storage.local.get(['name', 'age'], data => {...})

        // storage - is from manifest.json/permissions
        chrome.storage.local.get('name', data => {
            console.log('[BACKGROUND.js] Name is:', data.name);

            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail',
                });

                return;
            }

            sendResponse({
                message: 'success',
                payload: data.name
            })
        });

        return true; // says chrome not to close communication line with FE, until we send an async sendResponse from BE
    } else if (request.message === 'change_name') {
        chrome.storage.local.set({
            name: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail',
                });
                return;
            }

            sendResponse({
                message: 'success',
            })
        })
        return true;
    }
})
