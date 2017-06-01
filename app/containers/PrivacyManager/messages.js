import {defineMessages} from "react-intl";

export default defineMessages({
  clearUserData: {
    id: "PrivacyManager.openClearDialog",
    defaultMessage: "Clear cache",
  },
  clearHint: {
    id: "PrivacyManager.clearHint",
    defaultMessage: "Your current facebook session including your chats is deleted as soon as you log out using the " +
    "button in the top right corner."
  },
  clearHint2: {
    id: "PrivacyManager.clearHint2",
    defaultMessage: "This feature additionally deletes all other personal data - including your abbreviation dictionary, " +
    "your favorite emojis and memes, your auto responses etc."
  },
  clearHeader: {
    id: "PrivacyManager.clearHeader",
    defaultMessage: "Attention"
  },
  clearWarning: {
    id: "PrivacyManager.clearWarning",
    defaultMessage: "Do you really want to delete all your personal data? This step can't be undone!"
  },
  cancel: {
    id: "PrivacyManager.cancel",
    defaultMessage: "Cancel"
  },
  confirm: {
    id: "PrivacyManager.cancel",
    defaultMessage: "Clear"
  }
});
