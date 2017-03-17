import React from "react";
import {intlShape, injectIntl} from "react-intl";
import {Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn} from "material-ui";
import Scrollbars from "react-custom-scrollbars";
import muiThemeable from "material-ui/styles/muiThemeable";

function IntlTable(props) {

  const styles = {
    scrollbar: {
      height: props.height || 768,
    },
    footer: {
      padding: 16,
      color: props.muiTheme.palette.primary1Color
    },
    keyCol: props.keyColStyle || {},
    valueCol: props.valueColStyle || {},
  }

  const {formatMessage} = props.intl;

  return (
    <Scrollbars
      autoHide={true}
      style={styles.scrollbar}>
      <Table
        selectable={false}
        onCellClick={props.onSelectRow ? props.onSelectRow.bind(this, props.intlMap) : null}>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn
              style={styles.keyCol}>{props.keyHeader}</TableHeaderColumn>
            <TableHeaderColumn>{props.valueHeader}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover={true}>
          {Object.keys(props.intlMap).map((val, key) =>
            <TableRow
              key={key}>
              <TableRowColumn
                style={styles.keyCol}>{val}</TableRowColumn>
              <TableRowColumn
                style={styles.valueCol}>{formatMessage(props.intlMap[val])}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {
        props.footer
        ? <div style={styles.footer}>{props.footer}</div>
        : null
      }
    </Scrollbars>
  )
}

IntlTable.propTypes = {
  intl: intlShape.isRequired,
  intlMap: React.PropTypes.object.isRequired,
  keyHeader: React.PropTypes.string,
  valueHeader: React.PropTypes.string,
  keyColStyle: React.PropTypes.object,
  valueColStyle: React.PropTypes.object,
  height: React.PropTypes.number,
  onSelectRow: React.PropTypes.func,
  footer: React.PropTypes.string,
};

export default muiThemeable()(injectIntl(IntlTable));
