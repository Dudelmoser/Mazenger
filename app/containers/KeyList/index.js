import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import {selectAllSymmetricKeys, selectCurrentSymmetricKeys} from "./selectors";
import {} from "./actions";
import messages from "./messages";
import {List, ListItem, RaisedButton} from "material-ui";
import KeyIcon from "material-ui/svg-icons/communication/vpn-key";
import {importKeys} from "./actions";
import FileButton from "../../components/FileButton";
import muiThemeable from "material-ui/styles/muiThemeable";
import FileSaver from "file-saver";
import {KEY_FILE} from "./constants";
import ExportIcon from "material-ui/svg-icons/content/save";
import ImportIcon from "material-ui/svg-icons/file/file-upload";

export class KeyList extends React.PureComponent {

  state = {
    newKey: "",
    selected: [],
  };

  styles = {
    btn: {
      margin: 12,
    },
    btnDiv: {
      textAlign: "center",
    },
  };

  saveKeysToFile() {
    const file = new File([JSON.stringify(this.props.allKeys.toMap())], KEY_FILE, {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);
  }

  loadKeysFromFile(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const str = reader.result;
      this.props.importKeys(str);
    };
    reader.readAsText(input.files[0]);
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div>
        <List>
          {this.props.keys.map(key =>
            <ListItem
              key={key}
              secondaryText={key}
              leftIcon={<KeyIcon/>}
            />
          )}
        </List>

        <div style={this.styles.btnDiv}>
          <FileButton
            onSelect={this.loadKeysFromFile.bind(this)}
            label={formatMessage(messages.import)}
            icon={<ImportIcon/>}
            accept="text/*"
            style={this.styles.btn}
          />
          <RaisedButton
            primary={true}
            label={formatMessage(messages.export)}
            icon={<ExportIcon/>}
            onTouchTap={this.saveKeysToFile.bind(this)}
            style={this.styles.btn}
          />
        </div>
      </div>
    );
  }
}

KeyList.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  keys: selectCurrentSymmetricKeys(),
  allKeys: selectAllSymmetricKeys(),
});

const mapDispatchToProps = (dispatch) => ({
  importKeys: (str) => dispatch(importKeys(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(muiThemeable()(KeyList)));
