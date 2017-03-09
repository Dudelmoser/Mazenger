import {defineMessages} from "react-intl";

export default defineMessages({
  clearSettings: {
    id: "PrivacySettings.confirmClearSettings",
    defaultMessage: "Delete all my private data",
  },
  clearHint: {
    id: "PrivacySettings.clearHint",
    defaultMessage: "Your current facebook session including your chats is deleted as soon as you log out using the " +
    "button in the top right corner."
  },
  clearHint2: {
    id: "PrivacySettings.clearHint2",
    defaultMessage: "This feature additionally deletes all other personal data - including your abbreviation dictionary, " +
    "your favorite emojis and memes, your auto responses etc."
  },
  clearHeader: {
    id: "PrivacySettings.clearHeader",
    defaultMessage: "Attention"
  },
  clearWarning: {
    id: "PrivacySettings.clearWarning",
    defaultMessage: "Do you really want to clear all your personal data? This step can't be undone!"
  },
  cancel: {
    id: "PrivacySettings.cancel",
    defaultMessage: "Cancel"
  },
  confirm: {
    id: "PrivacySettings.cancel",
    defaultMessage: "Clear"
  }
});
