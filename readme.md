[![Build Status](https://travis-ci.org/Dudelmoser/Mazenger.svg?branch=master)](https://travis-ci.org/Dudelmoser/Mazenger)

## Features

### Implemented
* Chat with users of the official facebook messenger
* Use a wide range of categorized emojis
* Generate your own memes inside the messenger
* Change the color scheme to fit your taste

### Planned
* End-to-end encryption if both use this messenger
* Auto-respond to incoming messages
* Send delayed messages

## Quick start
1. Run `git clone https://github.com/Dudelmoser/Mazenger`
2. Run `npm install` inside the cloned repository to install the dependencies
3. Run `npm start` inside the same directory to start the local 'proxy' 
server that is needed to send cross origin requests to the facebook servers.
4. Open [localhost:3000](localhost:3000) inside your browser and login 
with your official facebook credentials.

## Credits
This web app is based on the awesome 
[React Boilerplate](https://github.com/mxstbr/react-boilerplate) 
by Max Stoiber. It really helped me understand the concepts of 
scalable JavaScript development based on technologies like..
* React
* Redux
* Reselect
* React Intl
* Redux Saga
* Webpack, Babel, HMR, etc.

Even more credit goes to the 
[Facebook Chat API](https://github.com/Schmavery/facebook-chat-api)
devs, who actually make the whole project possible.

## Supporters
Maybe you?

## License
This project is licensed under the MIT license, Copyright (c) 2016 
Jan David Kleiß. For more information see `license.md`.
