import React from "react";
import Tooltip from "react-tooltip";
import emojify from "react-easy-emoji";
import Scrollbars from "react-custom-scrollbars";
import {injectIntl, intlShape} from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, TextField, FlatButton} from "material-ui";
import AddIcon from "material-ui/svg-icons/content/add";
import RemoveIcon from "material-ui/svg-icons/content/remove";
import messages from "./messages";

/*
 A simple key-value table with inputs and buttons to add new entries and delete existing ones.
 */
function Dictionary(props) {

  const {formatMessage} = props.intl;

  const styles = {
    input: {
      width: "calc(50% - 36px)",
      marginLeft: "12px",
      verticalAlign: "bottom",
    },
    scrollbar: {
      height: (props.height || 768) - 122, // -36px (delBtn) -86px (addBar)
    },
    delIcon: {
      color: props.muiTheme.flatButton.secondaryTextColor
    },
    addIcon: {
      color: props.muiTheme.palette.primary1Color
    },
    delBtn: {
      top: 24,
      minWidth: 48,
    },
    addBtn: {
      minWidth: 48,
      marginTop: 28,
      marginBottom: 8,
      verticalAlign: "top",
      borderRadius: 0,
      borderBottom: "1px solid " + props.muiTheme.palette.borderColor,
    },
  };

  /* Add entry to dictionary and clear inputs. */
  const addEntry = () => {
    props.onAdd();
    const keyInput = document.getElementById(props.id + "Key");
    const valInput = document.getElementById(props.id + "Val");
    keyInput.value = "";
    valInput.value = "";
    keyInput.focus();
  };

  const handleKeyChange = (evt) => {
    if (evt.keyCode === 13)
      addEntry();
    props.onKeyChange(evt, evt.target.value);
  };

  const handleValueChange = (evt) => {
    if (evt.keyCode === 13)
      addEntry();
    props.onValueChange(evt, evt.target.value);
  };

  return (
    <div id="test" style={{height: props.height}}>
      <Scrollbars
        autoHide={true}
        style={styles.scrollbar}>
        <div>
          <Table
            multiSelectable={true}
            onRowSelection={(keys) => props.onSelect(keys)}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>{props.keyLabel}</TableHeaderColumn>
                <TableHeaderColumn>{props.valueLabel}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}>
              {props.entries.map((entry) => {
                return (
                  <TableRow
                    key={entry[0]}>
                    <TableRowColumn>{emojify(entry[0])}</TableRowColumn>
                    <TableRowColumn>{emojify(entry[1])}</TableRowColumn>
                  </TableRow>)
              })}
            </TableBody>
          </Table>
        </div>
      </Scrollbars>
      <div>
        <Tooltip
          class="tooltip"
          place={"right"}/>
        <div>
          <FlatButton
            style={styles.delBtn}
            onTouchTap={props.onDelete}
            data-tip={formatMessage(messages.deleteTip)}>
            <RemoveIcon style={styles.delIcon}/>
          </FlatButton>
        </div>
        <div>
          <FlatButton
            style={styles.addBtn}
            onTouchTap={props.onAdd}
            data-tip={formatMessage(messages.addTip)}>
            <AddIcon style={styles.addIcon}/>
          </FlatButton>
          <TextField
            id={props.id + "Key"}
            style={styles.input}
            floatingLabelText={props.keyLabel}
            onKeyUp={handleKeyChange}
          />
          <TextField
            id={props.id + "Val"}
            style={styles.input}
            floatingLabelText={props.valueLabel}
            onKeyUp={handleValueChange}
          />
        </div>
      </div>
    </div>
  );
}

Dictionary.propTypes = {
  id: React.PropTypes.string.isRequired,
  entries: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onAdd: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onKeyChange: React.PropTypes.func.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  keyLabel: React.PropTypes.string,
  valueLabel: React.PropTypes.string,
  height: React.PropTypes.number,
  intl: intlShape.isRequired,
};

export default muiThemeable()(injectIntl(Dictionary));
