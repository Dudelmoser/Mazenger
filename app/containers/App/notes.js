// Modules:
// socket.io, facebook-chat-api, material-ui, react-easy-emoji, react-custom-scrollbars, redux-persist, socket.io-client, react-tap-event-plugin
//
// Dependencies:
// FriendsList: users (getFriendsList)
// ThreadList: threadID, threads (getThreadList), users (getUserInfo), typing
// ThreadHistory: threadID, history (getThreadHistory), users (getUserInfo), typing
// MessageInput: threadID, dictionary, outbox
// EmojiList: emojis
// MemeGenerator: memes
// Chatbot: chatbot

import {fromJS} from "immutable";

const ROOT = "messenger";

const EMAIL = "email";
const PASSWORD = "password";
const IS_CONNECTED = "isConnected";

const SESSION = "session";
const USER_ID = "userID";
const THREAD_ID = "threadID";
const APP_STATE = "appState";

const FRIENDS = "friends";
const USERS = "users";

const THREADS = "threads";
const THREAD_HISTORY = "history";
const THREAD_TYPERS = "typers";
const THREAD_OUTBOX = "outbox";

const EMOJIS = "emojis";
const EMOJIS_FAVORITES = "favorites";
const EMOJIS_OPEN_GROUPS = "openGroups";

const MEMES = "memes";
const MEMES_TOP100 = "top100";
const MEMES_LOCAL = "local";
const MEMES_FAVORITES = "favorites";
const MEMES_CURRENT = "current";
const MEMES_TOP_CAPTION = "header";
const MEMES_BOTTOM_CAPTION = "footer";

const CHATBOT = "chatbot";
const CHATBOT_ENABLED = "enabled";
const CHATBOT_DICTIONARY = "dictionary";
const CHATBOT_TASKS = "tasks";

const DICTIONARY = "dictionary";

const SETTINGS = "settings";

const initialState = fromJS({
  email: "",
  password: "",
  isConnected: false,

  session: {
    userID: null,
    threadID: null,
    appState: null,
    friends: [],
    users: {},
    threads: {}
  }
});

const stateExample = {
  email: "",
  password: "",
  isConnected: false,

  session: {
    userID: null,
    threadID: null,
    appState: null,
    friends: [],
    users: {
      "100001663847246": {
        firstName: "Zanger",
        fullName: "Zanger Janus",                                     // [name]
        profileUrl: "https://www.facebook.com/zanger.janus",
        profilePicture: "https://scontent.ftxl1-1.fna.fbcdn.net/...", // [thumbSrc]
        isBirthday: false,
      },
    },
    threads: {
      "100002096958364": {
        snippet: "Hello",
        name: "Friends",
        nicknames: {"100001663847246": "ZJ"},
        participantIDs: ["100001663847246", "100000719100515", "100004684600778"],
        messageCount: 22,
        timestamp: 1488059498031,                                     // lastReadTimestamp in getThreadInfo
        unreadCount: 0,                                               // getThreadList only
        snippetSender: "100004684600778",                             // getThreadList only
        snippetAttachments: [/*attachments*/],                        // getThreadList only
        isArchived: false,                                            // getThreadList only
        isCanonical: false,                                           // getThreadList only
        isSubscribed: true,                                           // getThreadList only

        typers: {"userID": 1488059498031},
        history: [/*messages*/],
        outbox: ""
      },
    },
  },
  "userID": {
    emojis: {
      favorites: {},
      openGroups: [],
    },
    memes: {
      top100: [],
      local: [],
      faves: [],
      current: "",
      rendered: "",
      header: "",
      footer: "",
    },
    chatbot: {
      "threadID": {
        enabled: false,
        dictionary: [
          ["received", "response"],
        ],
        tasks: [
          [1488064245575, "message"],
        ],
      }
    },
    dictionary: {},
    settings: {},
  }
};

const initialStateOld = fromJS({
  users: {
    current: {
      email: "",
      password: "",
      userID: null,
      appState: null,
      isConnected: false,
    },
    friends: [],
  },
  threads: {
    inbox: [],
    archived: [],
  },
  emojis: {
    favorites: {},
    openGroups: [],
  },
  memes: {
    top100: [],
    local: [],
    favorites: [],
    current: "https://i.imgflip.com/1bij.jpg",
    rendered: "",
    header: "One does not simply",
    footer: "...",
  }
});

const stateExampleOld = {
  messenger: {
    users: {
      current: {
        email: "",
        password: "",
        userID: null,
        appState: null,
        isConnected: false,
      },
      friends: [],
      "userID": {
        info: {},
      },
    },
    threads: {
      current: null,
      inbox: [],
      archive: [],
      "threadID": {
        info: {},
        history: [],
        typing: {},
        outbox: "",
      },
    },
    emojis: {
      favorites: {},
      openGroups: [],
    },
    memes: {
      top100: [],
      local: [],
      faves: [],
      current: "",
      rendered: "",
      header: "",
      footer: "",
    },
    chatbot: {
      "threadID": {
        enabled: false,
        dictionary: [
          ["received", "response"],
        ],
        tasks: [
          [1488064245575, "message"],
        ],
      }
    },

  }
};
