import React from "react";
import {intlShape, injectIntl} from "react-intl";
import {Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn} from "material-ui";
import Scrollbars from "react-custom-scrollbars";

function IntlTable(props) {

  const styles = {
    keyCol: props.keyColStyle || {},
    valueCol: props.valueColStyle || {},
    scrollbar: {
      height: props.height || 768,
    },
  }
  const {formatMessage} = props.intl;

  return (
    <Scrollbars
      autoHide={true}
      style={styles.scrollbar}>
      <Table
        selectable={false}
        onCellClick={props.onSelectRow ? props.onSelectRow : null}>
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
};

export default injectIntl(IntlTable);
