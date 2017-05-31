import {defineMessages} from "react-intl";

export default defineMessages({
  global: {
    id: "AutoResponder.global",
    defaultMessage: "all chats"
  },
  local: {
    id: "AutoResponder.local",
    defaultMessage: "this chat"
  },
  regex: {
    id: "AutoResponder.regex",
    defaultMessage: "Regular expression"
  },
  res: {
    id: "AutoResponder.res",
    defaultMessage: "Response"
  },
  enabled: {
    id: "AutoResponder.enabled",
    defaultMessage: "Auto replies are enabled for "
  },
  disabled: {
    id: "AutoResponder.disabled",
    defaultMessage: "Auto replies are disabled for "
  },
  examples: {
    id: "AutoResponder.examples",
    defaultMessage: "Examples"
  },
  help: {
    id: "AutoResponder.help",
    defaultMessage: "Syntax"
  },
  explanation: {
    id: "AutoResponder.explanation",
    defaultMessage: "Explanation"
  },
  copied: {
    id: "AutoResponder.copied",
    defaultMessage: "Copied this regex to the clipboard!"
  },
  copyHint: {
    id: "AutoResponder.copyHint",
    defaultMessage: "TIP: Click on a row to copy it's regex to the clipboard!"
  },
  caseHint: {
    id: "AutoResponder.caseHint",
    defaultMessage: "TIP: This auto responder is case-insensitive!"
  },
});

/* Regex cheatsheet */
export const helpTable = defineMessages({
  "^hi": {
    id: "AutoResponder.start",
    defaultMessage: "hi at the start"
  },
  "!$": {
    id: "AutoResponder.end",
    defaultMessage: "! at the end"
  },
  ".": {
    id: "AutoResponder.dot",
    defaultMessage: "any character except newline"
  },
  "\\.": {
    id: "AutoResponder.escape",
    defaultMessage: "escape a special character like ."
  },
  "\\n": {
    id: "AutoResponder.newline",
    defaultMessage: "newline character"
  },
  "\\d": {
    id: "AutoResponder.digit",
    defaultMessage: "any digit [0-9]"
  },
  "\\w": {
    id: "AutoResponder.word",
    defaultMessage: "any word character [a-zA-Z0-9]"
  },
  "\\s": {
    id: "AutoResponder.space",
    defaultMessage: "any whitespace like space, newline"
  },
  "s?": {
    id: "AutoResponder.zeroOrOne",
    defaultMessage: "0 or 1 s"
  },
  "s*": {
    id: "AutoResponder.zeroOrMore",
    defaultMessage: "0 or more s"
  },
  "s+": {
    id: "AutoResponder.oneOrMore",
    defaultMessage: "1 or more s"
  },
  "s{5}": {
    id: "AutoResponder.nTimes",
    defaultMessage: "5 times s"
  },
  "s{2,}": {
    id: "AutoResponder.nPlusTimes",
    defaultMessage: "2 or more s"
  },
  "s{2-5}": {
    id: "AutoResponder.nToMtimes",
    defaultMessage: "2 to 5 s"
  },
  "(the)?": {
    id: "AutoResponder.group",
    defaultMessage: "0 or 1 the (can't be nested)"
  },
  "com|net": {
    id: "AutoResponder.group",
    defaultMessage: "com or net"
  },
  "[aA1]": {
    id: "AutoResponder.anyOf",
    defaultMessage: "a, A or 1"
  },
  "[^aA1]": {
    id: "AutoResponder.not",
    defaultMessage: "not a, A or 1"
  },
  "[a-f0-9]": {
    id: "AutoResponder.between",
    defaultMessage: "between a and f or 0 and 9"
  },
  "\\w\\W": {
    id: "AutoResponder.any",
    defaultMessage: "any character"
  },
});

/* Common auto responder patterns */
export const examplesTable = defineMessages({
  "^(hi|yo|hello|heyo?)|^.{0,9}(morning|evening)|(what.s up)|how('s|is) it going": {
    id: "AutoResponder.hello",
    defaultMessage: "Hey 🙂 How are you?"
  },
  "!{2,}": {
    id: "AutoResponder.calmDown",
    defaultMessage: "Calm down 😉"
  },
  "[\\w\\W]{15,}": {
    id: "AutoResponder.busy",
    defaultMessage: "Wait a minute.."
  },
  "happy|day|wish|best": {
    id: "AutoResponder.birthday",
    defaultMessage: "Thank you 😊"
  },
  "([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})": {
    id: "AutoResponder.email",
    defaultMessage: "Ok, I'll use that email!"
  },
});
