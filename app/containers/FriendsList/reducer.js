import {fromJS, List} from "immutable";
import {FRIENDS_LIST_RECEIVED} from "../App/actions/responses";

export default function (state = List(), action) {
  switch (action.type) {

    /* Sort the friends list before storing it. */
    case FRIENDS_LIST_RECEIVED:
      return fromJS(action.data)
        .sort((a, b) => {
          const na = a.get("fullName");
          const nb = b.get("fullName");
          if (na < nb) return -1;
          if (na > nb) return 1;
          if (na === nb) return 0;
        });
  }
}
