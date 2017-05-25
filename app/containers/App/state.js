// Modules:
// socket.io, socket.io-client, redux-persist-immutable, facebook-chat-api,
// material-ui, react-tap-event-plugin, react-easy-emoji, react-custom-scrollbars
//
// Dependencies:
// FriendsList: users (getFriendsList)
// ThreadList: threadID, threads (getThreadList), users (getUserInfo), typing
// ThreadHistory: threadID, history (getThreadHistory), users (getUserInfo), typing
// MessageInput: threadID, dictionary, outbox
// EmojiList: emojis
// MemeGenerator: memes
// Chatbot: chatbot

const stateExample = {
  global: {
    email: "",
    password: "",
    appState: null,
    userID: null,
    threadID: null,
    isConnected: false,
  },
  "userID": {
    friends: [{                                                       // getFriendsList()
        name: "Zanger Janus",
        firstName: "Zanger",
        userID: "100001663847246",
        profileUrl: "https://www.facebook.com/zanger.janus",
        thumbSrc: "https://scontent.ftxl1-1.fna.fbcdn.net/...",
        isBirthday: false,
      },
    ],

    users: {
      "userID": {
        fullName: "Zanger Janus",
        firstName: "Zanger",
        profileUrl: "https://www.facebook.com/zanger.janus",
        profilePicture: "https://scontent.ftxl1-1.fna.fbcdn.net/...",
        isBirthday: false,
      },
    },

    threads: {
      "threadID": {                                                   // getThreadList(); getThreadInfo()
        snippet: "Hello",
        nicknames: {"100001663847246": "ZJ"},
        participantIDs: ["100001663847246", "100000719100515", "100004684600778"],
        messageCount: 22,
        timestamp: 1488059498031,
        lastReadTimestamp: 1488059498031,                             // getThreadInfo only
        name: "Friends",                                              // getThreadInfo only
        snippetSender: "100004684600778",                             // getThreadList only
        snippetAttachments: [/*attachments*/],                        // getThreadList only
        unreadCount: 0,                                               // getThreadList only
        isArchived: false,                                            // getThreadList only
        isCanonical: false,                                           // getThreadList only
        isSubscribed: true,                                           // getThreadList only
      },
    },

    keys: {
      "threadID": {
        privKey: null,
        symKeys: [],
        isEncrypted: false,
      },
    },

    inputs: {
      "threadID": "",
    },

    typers: {
      "threadID": {
        "100001663847246": 1488059498031
      },
    },

    histories: {
      "threadID": [{
        messageID: "mid.1466685572194:30d37fc836dd59e621",
        body: "uiuiui",
        timestamp: 1466685572202,
        timestampRelative: "23.06.2016",
        timestampAbsolute: "23. Juni 2016",
        timestampDatetime: "23. Juni 2016 14:39",
        senderID: "fbid:100004684600778",
        senderName: "Zanger Janus",
        participantNames: ["Zanger"],
        threadID: "100002096958364",
        isGroup: false,
        attachments: [{
          type: "file",
          name: "audioclip-1466694308035-4828.mp4",
          url: "https://cdn.fbsbx.com/...",
        }, {
          type: "share",
          title: "How to Disable Windows 10 Data Collection - BestVPN.com",
          description: "Since its release on July 29,...",
          facebookUrl: "https://l.facebook.com/l.php?...",
          image: "https://external.ftxl1-1.fna.fbcdn.net/...",
          source: "bestvpn.com",
          width: 826,
          height: 418,
          playable: false,
        }, {
          type: "photo",
          thumbnailUrl: "https://scontent.ftxl1-1.fna.fbcdn.net/...",
          width: "960",
          height: "540",
          largePreviewUrl: "https://scontent.ftxl1-1.fna.fbcdn.net/...",
          largePreviewWidth: 853,
          largePreviewHeight: 480,
          previewUrl: "https://scontent.ftxl1-1.fna.fbcdn.net/...",
          previewWidth: 497,
          previewHeight: 280,
        }],
      }],
    },

    emojis: {
      favorites: {},
      openGroups: [],
    },

    memes: {
      header: "",
      footer: "",
      top100: [],
      local: [],
      faves: [],
      current: {},
      activeCat: 0,
    },

    chatbot: {
      global: {
        enabled: false,
        dict: {
          "[\s\S]?": "An employee will soon answer your question. Thank you for your patience!",
          "(shipping|delivery)": "The shipping fee is 2,95$",
          "(birthday|wish|best)": "Thank you :)",
        }
      },
      "threadID": {
        enabled: false,
        dict: {
          ".*": "Wait a sec! I'm ingame.."
        }
      },
    },

    abbreviations: {
      "abbr": "abbreviation",
    },

    settings: {
      accentColor: "rgb(235,255,0)",
      backgroundColor: "rgb(32,35,38)",
    }
  },
};
