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
    defaultMessage: "Syntax"
  },
  explanation: {
    id: "ChatbotTab.explanation",
    defaultMessage: "Explanation"
  },
  copied: {
    id: "ChatbotTab.copied",
    defaultMessage: "Copied this regex to the clipboard!"
  },
  copyHint: {
    id: "ChatbotTab.copyHint",
    defaultMessage: "TIP: Click on a row to copy it's regex to the clipboard!"
  },
  caseHint: {
    id: "ChatbotTab.caseHint",
    defaultMessage: "TIP: This chatbot is case-insensitive!"
  },
});

export const helpTable = defineMessages({
  "^hi": {
    id: "ChatbotTab.start",
    defaultMessage: "hi at the start"
  },
  "!$": {
    id: "ChatbotTab.end",
    defaultMessage: "! at the end"
  },
  ".": {
    id: "ChatbotTab.dot",
    defaultMessage: "any character except newline"
  },
  "\\.": {
    id: "ChatbotTab.escape",
    defaultMessage: "escape a special character like ."
  },
  "\\n": {
    id: "ChatbotTab.newline",
    defaultMessage: "newline character"
  },
  "\\d": {
    id: "ChatbotTab.digit",
    defaultMessage: "any digit [0-9]"
  },
  "\\w": {
    id: "ChatbotTab.word",
    defaultMessage: "any word character [a-zA-Z0-9]"
  },
  "\\s": {
    id: "ChatbotTab.space",
    defaultMessage: "any whitespace like space, newline"
  },
  "s?": {
    id: "ChatbotTab.zeroOrOne",
    defaultMessage: "0 or 1 s"
  },
  "s*": {
    id: "ChatbotTab.zeroOrMore",
    defaultMessage: "0 or more s"
  },
  "s+": {
    id: "ChatbotTab.oneOrMore",
    defaultMessage: "1 or more s"
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
    defaultMessage: "0 or 1 the (can't be nested)"
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
});

export const examplesTable = defineMessages({
  "^(hi|yo|hello|heyo?)|^.{0,9}(morning|evening)|(what.s up)|how('s|is) it going": {
    id: "ChatbotTab.hello",
    defaultMessage: "Hey 🙂 How are you?"
  },
  "!{2,}": {
    id: "ChatbotTab.calmDown",
    defaultMessage: "Calm down 😉"
  },
  "[\\w\\W]{15,}": {
    id: "ChatbotTab.busy",
    defaultMessage: "Wait a minute.."
  },
  "happy|day|wish|best": {
    id: "ChatbotTab.birthday",
    defaultMessage: "Thank you 😊"
  },
  "([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})": {
    id: "ChatbotTab.email",
    defaultMessage: "Ok, I'll use that email!"
  },
});
