# How To Make Chrome Extensions

Manifest v2:
[https://youtu.be/Ipa58NVGs_c](https://youtu.be/Ipa58NVGs_c)
Manifest v3:
[https://www.youtube.com/watch?v=5E94S1J2vBI](https://www.youtube.com/watch?v=5E94S1J2vBI)

# Add extension to browser:
* Go to `chrome://extensions/`
* Enable Developer mode
* Load unpacked and select the `bear` folder from this project.

# In manifest.json
- "content_scripts": [ { "matches": ["<all_urls>"] - in what specific websites to run it. In this case - run for all sites
- "action": { "default_popup": "popup.html" - what file will be loaded when you click on Widget icon by Left mouse click
- "options_page" - page showed on right click

images of widget in Extensions page and Widget itself can be different

# Files execution order
Content.js loaded first, then Background file loads after, then it injects foreground script. It means that:
1) Content.js loaded (it's from manifest v.2 and background should be used instead)
2) Background is loaded in Chrome extensions page -> service worker link 
3) Foreground is loaded in normal website


# BE and FE
background.js - BE

popup.js - FE
options.js - FE
foreground.js - FE

# Communication between BE and FE
chrome.runtime.sendMessage() - sends message to background.js, popup.js and options.js 
chrome.tabs.sendMessage() -  sends message to foreground.js

Receive message:
chrome.runtime.onMessage.addListener(() => {...})
