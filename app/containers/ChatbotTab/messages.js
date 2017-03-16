import {defineMessages} from "react-intl";

export default defineMessages({
  global: {
    id: "ChatbotTab.global",
    defaultMessage: "all chats"
  },
  local: {
    id: "ChatbotTab.local",
    defaultMessage: "this chat"
  },
  regex: {
    id: "ChatbotTab.regex",
    defaultMessage: "Regular expression"
  },
  res: {
    id: "ChatbotTab.res",
    defaultMessage: "Response"
  },
  enabled: {
    id: "ChatbotTab.enabled",
    defaultMessage: "Auto responses are enabled for "
  },
  disabled: {
    id: "ChatbotTab.disabled",
    defaultMessage: "Auto responses are disabled for "
  },
  examples: {
    id: "ChatbotTab.examples",
    defaultMessage: "Examples"
  },
  help: {
    id: "ChatbotTab.help",
    defaultMessage: "Help"
  },
  explanation: {
    id: "ChatbotTab.explanation",
    defaultMessage: "Explanation"
  },
  copied: {
    id: "ChatbotTab.copied",
    defaultMessage: "Copied this regex to the clipboard!"
  }
});

export const helpTable = defineMessages({
  "s*": {
    id: "ChatbotTab.zeroOrMore",
    defaultMessage: "0 or more s"
  },
  "s+": {
    id: "ChatbotTab.oneOrMore",
    defaultMessage: "1 or more s"
  },
  "s?": {
    id: "ChatbotTab.zeroOrOne",
    defaultMessage: "0 or 1 s"
  },
  "s{5}": {
    id: "ChatbotTab.nTimes",
    defaultMessage: "5 times s"
  },
  "s{2,}": {
    id: "ChatbotTab.nPlusTimes",
    defaultMessage: "2 or more s"
  },
  "s{2-5}": {
    id: "ChatbotTab.nToMtimes",
    defaultMessage: "2 to 5 s"
  },
  "(the)?": {
    id: "ChatbotTab.group",
    defaultMessage: "0 or 1 the"
  },
  "com|net": {
    id: "ChatbotTab.group",
    defaultMessage: "com or net"
  },
  "[aA1]": {
    id: "ChatbotTab.anyOf",
    defaultMessage: "a, A or 1"
  },
  "[^aA1]": {
    id: "ChatbotTab.not",
    defaultMessage: "not a, A or 1"
  },
  "[a-f0-9]": {
    id: "ChatbotTab.between",
    defaultMessage: "between a and f or 0 and 9"
  },
  "\\w\\W": {
    id: "ChatbotTab.any",
    defaultMessage: "any character"
  },
  ".": {
    id: "ChatbotTab.dot",
    defaultMessage: "any character except newline"
  },
  "\\n": {
    id: "ChatbotTab.newline",
    defaultMessage: "newline character"
  },
  "\\s": {
    id: "ChatbotTab.space",
    defaultMessage: "any whitespace like space, newline"
  },
  "\\d": {
    id: "ChatbotTab.digit",
    defaultMessage: "any digit [0-9]"
  },
  "\\w": {
    id: "ChatbotTab.word",
    defaultMessage: "any word character [a-zA-Z0-9]"
  },
  "\\.": {
    id: "ChatbotTab.escape",
    defaultMessage: "escape a special character like ."
  },
});

export const examplesTable = defineMessages({
  "(b(irth)?day|wish|best)": {
    id: "ChatbotTab.birthday",
    defaultMessage: "Thank you :)"
  },
  "[\\S\\s]\\?": {
    id: "ChatbotTab.ingame",
    defaultMessage: "Wait a sec! I'm ingame..."
  },
});
