import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import {Tabs, Tab, Toggle} from "material-ui";
import muiThemeable from "material-ui/styles/muiThemeable";
import {selectLocalDict, selectGlobalDict, selectIsLocalEnabled, selectIsGlobalEnabled} from "./selectors";
import {addRegex, deleteRegex, setChatbotState} from "./actions";
import {drawerHeight} from "../App/components";
import Dictionary from "../../components/Dictionary";

export class ChatbotTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    gRegex: "",
    gRes: "",
    gSelect: [],
    regex: "",
    res: "",
    select: [],
  };

  styles = {
    tabs: {
      position: "relative",
      top: -2,
    },
    tabItem: {
      backgroundColor: this.props.muiTheme.drawer.color
    },
    tabContent: {
      paddingTop: 16,
      paddingRight: 0,
    },
    toggle: {
      padding: "16px 16px 32px 16px",
    }
  };

  render() {
console.log(drawerHeight);
    const {formatMessage} = this.props.intl;
    const globalMsg = formatMessage(this.props.isGlobalEnabled ? messages.enabled : messages.disabled);
    const localMsg = formatMessage(this.props.isLocalEnabled ? messages.enabled : messages.disabled);
    return (
      <Tabs
        style={this.styles.tabs}
        tabItemContainerStyle={this.styles.tabItem}>
        <Tab
          label={formatMessage(messages.global)}>
          <Toggle
            toggled={this.props.isGlobalEnabled}
            onToggle={this.props.setBotState.bind(this, true)}
            label={globalMsg + formatMessage(messages.global)}
            labelPosition="right"
            style={this.styles.toggle}
          />
          <Dictionary
            entries={this.props.globalDict}
            keyLabel={formatMessage(messages.regex)}
            valueLabel={formatMessage(messages.res)}
            onSelect={(keys) => this.setState({gSelect: keys})}
            onDelete={this.props.delRegex.bind(this, true, this.state.gSelect)}
            onKeyChange={(evt, val) => this.setState({gRegex: val})}
            onValueChange={(evt, val) => this.setState({gRes: val})}
            onAdd={this.props.addRegex.bind(this, true, this.state.gRegex, this.state.gRes)}
            height={drawerHeight - 118}
          />
        </Tab>
        <Tab
          label={formatMessage(messages.local)}>
          <Toggle
            toggled={this.props.isLocalEnabled}
            onToggle={this.props.setBotState.bind(this, false)}
            label={localMsg + formatMessage(messages.local)}
            labelPosition="right"
            style={this.styles.toggle}
          />
          <Dictionary
            entries={this.props.localDict}
            keyLabel={formatMessage(messages.regex)}
            valueLabel={formatMessage(messages.res)}
            onSelect={(keys) => this.setState({select: keys})}
            onDelete={this.props.delRegex.bind(this, false, this.state.select)}
            onKeyChange={(evt, val) => this.setState({regex: val})}
            onValueChange={(evt, val) => this.setState({res: val})}
            onAdd={this.props.addRegex.bind(this, false, this.state.regex, this.state.res)}
            height={drawerHeight - 118}
          />
        </Tab>
      </Tabs>
    );
  }
}

ChatbotTab.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
  localDict: selectLocalDict(),
  globalDict: selectGlobalDict(),
  isLocalEnabled: selectIsLocalEnabled(),
  isGlobalEnabled: selectIsGlobalEnabled(),
});

const mapDispatchToProps = (dispatch) => ({
  addRegex: (global, regex, res) => {
    dispatch(addRegex(global, regex, res));
  },
  delRegex: (global, keys) => dispatch(deleteRegex(global, keys)),
  setBotState: (global, evt, enabled) => dispatch(setChatbotState(global, enabled)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(muiThemeable()(ChatbotTab)));
