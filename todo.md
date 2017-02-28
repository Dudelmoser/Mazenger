## Milestones
### High priority
* ~~fb api proxy server~~
* ~~desktop react core~~
* ~~client-server-saga~~
* ~~persistent state~~
* ~~dynamic login~~
* ~~chats tab~~
* ~~friends tab~~
* ~~emoji tab~~
* meme tab
* chatbot tab
* settings tab
* encryption
* performance tests
* compatibility tests
* github docs

### Medium priority
* one-click installer
* promotion website

### Low priority
* light theme
* multi user
* whatsapp support (yosapp)
* online version (openshift)
* mobile layout

## Features

### High priority
* login with return
* login failed feedback
* show users typing
* request more messages when reaching the end of the thread history
* ~~make drawers scrollable~~
* ~~logout and clear cache option~~
* ~~keep thread scrolled to bottom~~

### Low priority
* allow textual shortcuts for emojis 
(see http://www.webpagefx.com/tools/emoji-cheat-sheet/)
* keep focus when entering an emoji
* mini audio player in thread history
* replace input with content-editable div to enter img emojis
* ~~add open emoji categories to state~~

## Code
* split messenger container into sub containers 
* extract separate reducers and actions
* create stateless components for every stateful container
* ~~reference state properties with constants~~

## Bugs

### Reproducable
* login with different credentials doesn't auto-clear the cache
* chat input switches from uncontrolled to controlled
(results in weird overlay effect)

### Not reproducable
* messages sent twice
* own and foreign messages switch sides 
(probably due to a bug in the selectMessage or isOwn selector)

### Fixed
* ~~thread history doesn't auto scroll~~
* ~~self-chat caused by wrong thread IDs in typing events~~
* ~~react-easy-emoji null pointer after clearing the cache~~