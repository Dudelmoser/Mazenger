import {createSelector} from "reselect";
import {Map, List} from "immutable";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {IS_ENCRYPTED, INPUTS, KEYS, PRIVATE_KEY, SYMMETRIC_KEYS, SHOW_COMMANDS} from "./constants";
import {selectSettings} from "../SettingsTab/selectors";

const selectInputs = () => createSelector(
  selectSession(),
  (session) => session.get(INPUTS) || Map()
);

const selectCurrentInput = () => createSelector(
  selectInputs(),
  selectCurrentThreadID(),
  (inputs, threadID) => inputs.get(threadID) || ""
);

const selectAllKeys = () => createSelector(
  selectSession(),
  (session, threadID) => session.get(KEYS) || Map()
);

const selectKeys = (threadID) => createSelector(
  selectAllKeys(),
  (keys) => keys.get(threadID) || Map()
);

const selectPrivateKey = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(PRIVATE_KEY)
);

const selectSymmetricKeys = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(SYMMETRIC_KEYS) || List()
);

const selectLatestKey = (threadID) => createSelector(
  selectSymmetricKeys(threadID),
  (pws) => pws.last()
);

const selectIsEncrypted = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(IS_ENCRYPTED)
);

const selectShowCommands = () => createSelector(
  selectSettings(),
  (settings) => settings.get(SHOW_COMMANDS)
);

export {
  selectCurrentInput,
  selectPrivateKey,
  selectSymmetricKeys,
  selectLatestKey,
  selectIsEncrypted,
  selectShowCommands,
}
