import {fromJS} from "immutable";

export const USERS = "users";
export const CURRENT_USER = "current";
export const EMAIL = "email";
export const PASSWORD = "password";
export const USER_ID = "userID";
export const APP_STATE = "appState";
export const IS_CONNECTED = "isConnected";
export const FRIENDS = "friends";
export const USER_INFO = "info";
export const THREADS = "threads";
export const CURRENT_THREAD = "current";
export const INBOX = "inbox";
export const ARCHIVE = "archive";
export const THREAD_INFO = "info";
export const THREAD_HISTORY = "history";
export const TYPING = "typing";
export const OUTBOX = "outbox";
export const EMOJIS = "emojis";
export const FAVORITES = "favorites";
export const OPEN_GROUPS = "openGroups";
export const CHATBOT = "chatbot";
export const IS_ACTIVE = "isActive";
export const DICTIONARY = "dictionary";
export const TASKS = "tasks";
export const MEMES = "memes";
export const TOP100_MEMES = "top100";
export const LOCAL_MEMES = "local";
export const FAVORITE_MEMES = "favorites";
export const CURRENT_MEME = "current";
export const RENDERED_MEME = "rendered";
export const TOP_CAPTION = "header";
export const BOTTOM_CAPTION = "footer";

export const initialState = fromJS({
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

const stateTemplate = {
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
        chatbot: {
          isActive: false,
          dictionary: {},
          tasks: [],
        },
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
    }
  }
};