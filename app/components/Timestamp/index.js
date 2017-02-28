import * as React from "react";
import {injectIntl, intlShape} from 'react-intl';
import messages from "./messages";

function Timestamp(props) {

  const style = {
    marginTop: "1em",
    textAlign: "center",
    opacity: 0.5,
  };

  function getDay(date) {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const id = messages[days[date.getDay()]];
    return props.intl.formatMessage(id);
  }

  function getMonth(date) {
    const months = ["january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"];
    const id = messages[months[date.getMonth()]];
    return props.intl.formatMessage(id);
  }

  function getDateTime() {
    const timestamp = parseInt(props.timestamp);
    let str = "";

    const dayInMs = 1000 * 60 * 60 * 24;
    const now = new Date();
    const date = new Date(timestamp);

    const daysPassed = (now - timestamp) / dayInMs;

    if (daysPassed < 6) {
      let dayDiff = new Date(now).getDay() - date.getDay();
      if (dayDiff < 0)
        dayDiff += 7;

      if (dayDiff == 1) {
        str = props.intl.formatMessage(messages.yesterday);
      } else if (dayDiff > 1) {
        str = getDay(date);
      }
    } else {
      str = props.intl.formatMessage(messages.dateFormat);
      str = str.replace("YEAR", date.getFullYear() + "");
      str = str.replace("MONTH", getMonth(date));
      str = str.replace("DAY", date.getDate() + "");
    }
    str += " " + date.getHours() + ":" + ("0" + date.getMinutes()).substr(-2, 2);
    return str;
  }

  if (!props.condition)
    return null;
  return (
    <div>
      <aside style={style}>{getDateTime()}</aside>
    </div>
  );
}

Timestamp.propTypes = {
  intl: intlShape.isRequired,
  timestamp: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]).isRequired,
  condition: React.PropTypes.bool,
}

export default injectIntl(Timestamp);