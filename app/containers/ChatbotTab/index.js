import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import {helpTable, examplesTable} from "./messages";
import {Tabs, Tab, Toggle, Snackbar} from "material-ui";
import muiThemeable from "material-ui/styles/muiThemeable";
import {selectLocalDict, selectGlobalDict, selectIsLocalEnabled, selectIsGlobalEnabled} from "./selectors";
import {addRegex, deleteRegex, setChatbotState} from "./actions";
import {drawerHeight} from "../App/components";
import Dictionary from "../../components/Dictionary";
import IntlTable from "../../components/IntlTable";

export class ChatbotTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  dictHeight = drawerHeight - 118;
  tableHeight = drawerHeight - 48;

  state = {
    gRegex: "",
    gRes: "",
    gSelect: [],
    regex: "",
    res: "",
    select: [],
    open: false,
  };

  styles = {
    tabs: {
      position: "relative",
      top: -2,
    },
    tabContent: {
      paddingTop: 16,
      paddingRight: 0,
    },
    toggle: {
      padding: "32px 16px 16px 16px",
    }
  };

  copyToClipboard(row) {
    // Workaround to copy text to the clipboard without using an input or textarea element
    // Credits to Dean Taylor on stackoverflow
    // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    var fakeInput = document.createElement("textarea");
    fakeInput.style.position = "fixed";
    fakeInput.style.top = 0;
    fakeInput.style.left = 0;
    fakeInput.style.width = "2em";
    fakeInput.style.height = "2em";
    fakeInput.style.padding = 0;
    fakeInput.style.border = "none";
    fakeInput.style.outline = "none";
    fakeInput.style.boxShadow = "none";
    fakeInput.style.background = "transparent";

    fakeInput.value = Object.keys(examplesTable)[row];
    document.body.appendChild(fakeInput);
    fakeInput.select();

    try {
      if (document.queryCommandSupported("copy")) {
        const success = document.execCommand("copy");
        if (success)
          this.setState({open: true});
      }
    } finally {
      document.body.removeChild(fakeInput);
    }
  }

  render() {
    const {formatMessage} = this.props.intl;
    const globalMsg = formatMessage(this.props.isGlobalEnabled ? messages.enabled : messages.disabled);
    const localMsg = formatMessage(this.props.isLocalEnabled ? messages.enabled : messages.disabled);

    const styles = {
      tabItem: {
        backgroundColor: this.props.muiTheme.drawer.color
      },
    }

    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={formatMessage(messages.copied)}
          autoHideDuration={2000}
          onRequestClose={() => this.setState({open: false})}
          style={{left: "50%"}}
        />
        <Tabs
          style={this.styles.tabs}
          tabItemContainerStyle={styles.tabItem}>
          <Tab
            label={formatMessage(messages.global)}>
            <Toggle
              toggled={this.props.isGlobalEnabled}
              onToggle={this.props.setBotState.bind(this, true)}
              label={globalMsg + formatMessage(messages.global)}
              style={this.styles.toggle}
            />
            {this.props.isGlobalEnabled ? <Dictionary
              style={styles}
              entries={this.props.globalDict}
              keyLabel={formatMessage(messages.regex)}
              valueLabel={formatMessage(messages.res)}
              onSelect={(keys) => this.setState({gSelect: keys})}
              onDelete={this.props.delRegex.bind(this, true, this.state.gSelect)}
              onKeyChange={(evt, val) => this.setState({gRegex: val})}
              onValueChange={(evt, val) => this.setState({gRes: val})}
              onAdd={this.props.addRegex.bind(this, true, this.state.gRegex, this.state.gRes)}
              height={this.dictHeight}
            /> : null}
          </Tab>
          <Tab
            label={formatMessage(messages.local)}>
            <Toggle
              toggled={this.props.isLocalEnabled}
              onToggle={this.props.setBotState.bind(this, false)}
              label={localMsg + formatMessage(messages.local)}
              style={this.styles.toggle}
            />
            {this.props.isLocalEnabled ? <Dictionary
              entries={this.props.localDict}
              keyLabel={formatMessage(messages.regex)}
              valueLabel={formatMessage(messages.res)}
              onSelect={(keys) => this.setState({select: keys})}
              onDelete={this.props.delRegex.bind(this, false, this.state.select)}
              onKeyChange={(evt, val) => this.setState({regex: val})}
              onValueChange={(evt, val) => this.setState({res: val})}
              onAdd={this.props.addRegex.bind(this, false, this.state.regex, this.state.res)}
              height={this.dictHeight}
            /> : null}
          </Tab>
          <Tab
            label={formatMessage(messages.examples)}>
            <IntlTable
              intlMap={examplesTable}
              keyHeader={formatMessage(messages.regex)}
              valueHeader={formatMessage(messages.explanation)}
              onSelectRow={this.copyToClipboard.bind(this)}
              height={this.tableHeight}
            />
          </Tab>
          <Tab
            label={formatMessage(messages.help)}>
            <IntlTable
              intlMap={helpTable}
              keyHeader={formatMessage(messages.regex)}
              valueHeader={formatMessage(messages.explanation)}
              height={this.tableHeight}
              keyColStyle={{width: "10rem"}}
            />
          </Tab>
        </Tabs>
      </div>
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
