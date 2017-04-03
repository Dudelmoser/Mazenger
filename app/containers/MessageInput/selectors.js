import {createSelector} from "reselect";
import {Map} from "immutable";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {INPUTS, KEYS, AES_KEY, PUBLIC_KEY, PRIVATE_KEY} from "./constants";

const selectInputs = () => createSelector(
  selectSession(),
  (session) => session.get(INPUTS) || Map()
);

const selectCurrentInput = () => createSelector(
  selectInputs(),
  selectCurrentThreadID(),
  (inputs, threadID) => inputs.get(threadID) || ""
);

const selectKeys = () => createSelector(
  selectSession(),
  (session, threadID) => session.get(KEYS) || Map()
);

const selectCurrentKeys = () => createSelector(
  selectKeys(),
  selectCurrentThreadID(),
  (keys, threadID) => keys.get(threadID) || Map()
);

const selectCurrentAesKey = () => createSelector(
  selectCurrentKeys(),
  (keys) => keys.get(AES_KEY)
);

const selectCurrentPublicKey = () => createSelector(
  selectCurrentKeys(),
  (keys) => keys.get(PUBLIC_KEY)
);

const selectCurrentPrivateKey = () => createSelector(
  selectCurrentKeys(),
  (keys) => keys.get(PRIVATE_KEY)
);

export {
  selectCurrentInput,
  selectCurrentAesKey,
  selectCurrentPublicKey,
  selectCurrentPrivateKey,
}
