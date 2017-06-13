import React from "react";
import ReactDOM from "react-dom";

const wrap = (name, key) => `${name} (Ctrl+${key})`;
const names = ["Alice", "Bob", "John"];
const element = (
  <ul
    className="styledList"
    style={{fontSize: 16}}>
    {
      names.map((name, key) => <li>{wrap(name, key)}</li>)
    }
  </ul>
);

ReactDOM.render(
  element,
  document.getElementById("container")
);

function MyComponent(props) {
  return (
    <button
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}
MyComponent.propTypes = {
  text: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  onClick: React.PropTypes.func,
};
MyComponent.defaultProps = {
  onClick: () => alert("Button clicked")
};

class MyContainer extends React.PureComponent {
  state = {
    clicked: false,
  };

  render() {
    return (
      <div>
        <span>{this.state.clicked ? "Button was pressed" : null}</span>
        <MyComponent
          text="Push this button"
          onClick={() => this.setState({clicked: true})}
        />
      </div>
    );
  }
}

const width = window.innerHeight * .5;
injectGlobal`#beispiel {width: ${width}`;

function tagFunc(templateStrings, ...substitutions) {}


export const NAME_CHANGED = "nameChanged";
export function createNameChanged(evt) {
  const parts = evt.target.value.split(" ");
  return {
    type: NAME_CHANGED,
    firstName: parts[0],
    lastName: parts[1],
  }
}

const createSelectFirstName = (userID) => createSelector(
  selectUser(userID),
  (user) => user.get("firstName") || "Unknown User"
);

const mapStateToProps = createStructuredSelector({
  friends: createSelectFriends(),
});

const mapStateToProps = (state, ownProps) => ({
  messages: createSelectMessages(ownProps.threadID)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteMessage: (id) => dispatch(createDeleteMessage(ownProps.threadID, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
