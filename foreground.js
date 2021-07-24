// visible on the actual web page. This file is considered to be a FE
console.log('[FOREGROUND] I am the foreground.js');

// making transformations on the opened website

const ceMainContainer = document.createElement('div');
const ceName = document.createElement('div');
const ceInput = document.createElement('input');
const ceButton = document.createElement('div');

// this will be run only for Google website
if (document.title === 'Google') {
    rotateGoogleImage();
    createCeForm();
}

function rotateGoogleImage() {
    const googleLogoImage = document.querySelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img');
    if (googleLogoImage) {
        googleLogoImage.style.transitionDuration = '2.0s';
        googleLogoImage.style.transform = 'rotate(360deg)';
    }
}

function createCeForm() {
    ceMainContainer.classList.add('ce-main');
    ceName.id = 'ce-name';
    ceInput.id = 'ce-input';
    ceButton.id = 'ce-button';

    ceName.innerHTML = `Hello NAME`;
    ceButton.innerHTML = `Change name`;

    ceMainContainer.appendChild(ceName);
    ceMainContainer.appendChild(ceInput);
    ceMainContainer.appendChild(ceButton);

    document.querySelector('body').appendChild(ceMainContainer);
}

// argument can also be a simple string, not Obj
// We are requesting data from BE
chrome.runtime.sendMessage({
    message: 'get_name'
}, response => {
    if (response.message === 'success') {
        ceName.innerHTML = `Hello ${response.payload}`;
    }
});


ceButton.addEventListener('click', () => {
    // argument can also be a simple string, not Obj
    // we are requesting data from BE
    chrome.runtime.sendMessage({
        message: 'change_name',
        payload: ceInput.value
    }, response => {
        if (response.message === 'success') {
            ceName.innerHTML = `Hello ${ceInput.value}`;
        }
    });
})

// this will be run just when new tab is updated and css and js is injected to FE from BE chrome.tabs.onUpdated f()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'change_name') {
        ceName.innerHTML = `Hello ${request.payload}`;
    }
})

