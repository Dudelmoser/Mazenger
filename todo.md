## Milestones
Feature | Priority | Status
------- | -------- | ------
fb api proxy server|H|✓
desktop react core|H|✓
client-server-saga|H|✓
persistent state|H|✓
dynamic login|H|✓
chats tab|H|✓
friends tab|H|✓
emoji tab|H|✓
meme tab|H|✓
settings tab|H|✓
abbreviation tab|H|✓
chatbot tab|H|-
encryption|H|-
performance tests|H|-
compatibility tests|H|-
github docs|H|-
travis support|M|✓
themes|M|✓
multi user support|M|✓
one-click installer|M|-
promotion website|M|-
whatsapp support (yosapp)|L|-
online version (openshift)|L|-
mobile layout|L|-

## Features
Feature | Priority | Status
------- | -------- | ------
request more messages when reaching the end of the thread history|H|-
login failed feedback|H|-
send files via drag and drop|M|-
rerender when window size changes|M|-
send button|M|-
video support|M|-
audio support|M|-
keyboard shortcuts|L|-
send message to multiple users|L|-
switch memes with canvas clicks|L|-
clean custom meme cache when user cleans his browser cache|L|-
make custom memes private using some sort of session cookie|L|-
set secondary button color dynamically with getContrast()|L|-
~~replace input with content-editable div to enter img emojis~~|L|-
scrollable drawer|H|✓
keep thread scrolled to bottom|H|✓
logout and clear cache option|H|✓
keep focus when entering an emoji|M|✓
sender tooltip|M|✓
users typing|M|✓
login with return|M|✓
stateful open emoji categories|L|✓
textual emoji shortcuts|L|✓

## Code
Feature | Priority | Status
------- | -------- | ------
unified naming convention for actions|H|-
convert inline styles to global styles (2x faster, e.g. with react-inline)|M|-
stateless components for every stateful container (containing HTML and CSS only)|M|-
remove typing notifications for group chats|L|-
split messenger container into sub containers|H|✓
reference state properties with constants|H|✓
extract separate reducers and actions|H|✓

## Bugs
Description | Status
----------- | ------
switching accounts crashes the client|!
chat input switches from uncontrolled to controlled|!
messages sent twice|?
login with different credentials doesn't auto-clear the cache|F
own and foreign messages switch sides|F
thread history doesn't auto scroll|F
self-chat caused by wrong thread IDs in typing events|F
react-easy-emoji null pointer after clearing the cache|F
