import {createSelector} from "reselect";
import {Map, List} from "immutable";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {IS_ENCRYPTED, INPUTS, KEYS, PRIVATE_KEY, SYMMETRIC_KEYS, SHOW_COMMANDS} from "./constants";

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
  (session) => session.get(KEYS) || Map()
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

const selectIsCurrentThreadEncrypted = () => createSelector(
  selectCurrentThreadID(),
  selectAllKeys(),
  (threadID, keys) => keys.getIn([threadID, IS_ENCRYPTED])
);

export {
  selectCurrentInput,
  selectPrivateKey,
  selectSymmetricKeys,
  selectLatestKey,
  selectIsEncrypted,
  selectIsCurrentThreadEncrypted,
}
