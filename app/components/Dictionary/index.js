import React from "react";
import Tooltip from "react-tooltip";
import emojify from "react-easy-emoji";
import Scrollbars from "react-custom-scrollbars";
import {injectIntl, intlShape} from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, TextField, FlatButton} from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import messages from "./messages";

function Dictionary(props) { // eslint-disable-line react/prefer-stateless-function

  const {formatMessage} = props.intl;

  const styles = {
    input: {
      width: "calc(50% - 36px)",
      marginLeft: "12px"
    },
    scrollbar: {
      height: (props.height || 768) - 124,
    },
    delIcon: {
      color: props.muiTheme.flatButton.secondaryTextColor
    },
    addIcon: {
      color: props.muiTheme.palette.primary1Color
    },
    delBtn: {
      top: 16,
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

  return (
    <div>
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
      <div style={{position: "relative", top: 16, overflow: "hidden"}}>
        <Tooltip class="tooltip"/>
        <div>
          <FlatButton
            style={styles.delBtn}
            onTouchTap={props.onDelete}
            data-tip={formatMessage(messages.deleteTip)}>
            <ContentRemove style={styles.delIcon}/>
          </FlatButton>
        </div>
        <div>
          <FlatButton
            style={styles.addBtn}
            onTouchTap={props.onAdd}
            data-tip={formatMessage(messages.addTip)}>
            <ContentAdd style={styles.addIcon}/>
          </FlatButton>
          <TextField
            style={styles.input}
            floatingLabelText={props.keyLabel}
            onChange={(evt, val) => props.onKeyChange(evt, val)}
          />
          <TextField
            style={styles.input}
            floatingLabelText={props.valueLabel}
            onChange={(evt, val) => props.onValueChange(evt, val)}
          />
        </div>
      </div>
    </div>
  );
}

Dictionary.propTypes = {
  entries: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onKeyChange: React.PropTypes.func.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
  onAdd: React.PropTypes.func.isRequired,
  keyLabel: React.PropTypes.string,
  valueLabel: React.PropTypes.string,
  height: React.PropTypes.number,
  intl: intlShape.isRequired,
}

export default muiThemeable()(injectIntl(Dictionary));
