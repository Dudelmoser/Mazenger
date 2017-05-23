import {fromJS, List} from "immutable";
import {FRIENDS_LIST_RECEIVED} from "../App/actions/responses";

const initState = List();

export default function (state = initState, action) {
  switch (action.type) {

    case FRIENDS_LIST_RECEIVED:
      return fromJS(action.data)
        .sort((a, b) => {
          const na = a.get("fullName");
          const nb = b.get("fullName");
          if (na < nb) return -1;
          if (na > nb) return 1;
          if (na == nb) return 0;
        });
  }
}
