import {fromJS} from "immutable";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";

const initState = fromJS({});

export default function (state = initState, action) {
  switch (action.type) {

    case CLEAR_SETTINGS:
      return initState;
  }
}
