import {createSelector} from "reselect";
import {Map, List} from "immutable";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {INPUTS, KEYS, PK, PWS} from "./constants";

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

const selectPublicKey = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(PK)
);

const selectPasswords = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(PWS) || List()
);

const selectLatestPassword = (threadID) => createSelector(
  selectPasswords(threadID),
  (pws) => pws.last()
);

export {
  selectCurrentInput,
  selectPublicKey,
  selectPasswords,
  selectLatestPassword,
}
