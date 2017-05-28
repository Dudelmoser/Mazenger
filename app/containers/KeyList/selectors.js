import {createSelector} from "reselect";
import {IS_ENCRYPTED, KEYS, PRIVATE_KEY, SYMMETRIC_KEYS} from "./constants";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {List, Map} from "immutable";
import forge from "node-forge";

export const selectCurrentKeys = () => createSelector(
  selectAllKeys(),
  selectCurrentThreadID(),
  (keys, threadID) => keys.get(threadID) || Map()
);

export const selectCurrentSymmetricKeys = () => createSelector(
  selectCurrentKeys(),
  (keys) => (keys.get(SYMMETRIC_KEYS) || List())
    .map(key => forge.util.encode64(key)) || List()
);

export const selectAllKeys = () => createSelector(
  selectSession(),
  (session) => session.get(KEYS) || Map()
);

const selectKeys = (threadID) => createSelector(
  selectAllKeys(),
  (keys) => keys.get(threadID) || Map()
);

export const selectPrivateKey = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(PRIVATE_KEY)
);

export const selectSymmetricKeys = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(SYMMETRIC_KEYS) || List()
);

export const selectLatestKey = (threadID) => createSelector(
  selectSymmetricKeys(threadID),
  (pws) => pws.last()
);

export const selectIsEncrypted = (threadID) => createSelector(
  selectKeys(threadID),
  (keys) => keys.get(IS_ENCRYPTED)
);

export const selectIsCurrentThreadEncrypted = () => createSelector(
  selectCurrentThreadID(),
  selectAllKeys(),
  (threadID, keys) => keys.getIn([threadID, IS_ENCRYPTED])
);

export const selectAllSymmetricKeys = () => createSelector(
  selectAllKeys(),
  (keys) => keys.map(thread =>
    thread.get(SYMMETRIC_KEYS)
  )
);
