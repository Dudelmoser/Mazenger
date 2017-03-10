import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, TextField, RaisedButton} from "material-ui";
import messages from "./messages";
import muiThemeable from "material-ui/styles/muiThemeable";
import {selectMyAbbreviations} from "./selectors";
import {deleteAbbreviations, addAbbreviation} from "./actions";
import emoji from "react-easy-emoji";

export class AbbreviationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    abbr: "",
    full: "",
    selected: [],
  }

  styles = {
    wrapper: {
      padding: "1rem",
    },
    abbrInput: {
      width: 96,
      marginRight: 16,
    },
    textInput: {
      width: "calc(100% - 96px - 16px)"
    }
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div style={this.styles.wrapper}>
        <Table
          multiSelectable={true}
          onRowSelection={(keys) => this.setState({selected: keys})}>
          <TableHeader
            displaySelectAll={true}>
            <TableRow>
              <TableHeaderColumn>{formatMessage(messages.abbreviation)}</TableHeaderColumn>
              <TableHeaderColumn>{formatMessage(messages.fullForm)}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}>
            {this.props.abbrs.map((full, abbr) => {
              return (
              <TableRow>
                <TableRowColumn>{abbr}</TableRowColumn>
                <TableRowColumn>{emoji(full)}</TableRowColumn>
              </TableRow>)
            })}
          </TableBody>
        </Table>

        <TextField
          id="abbr"
          style={this.styles.abbrInput}
          floatingLabelText={formatMessage(messages.abbreviation)}
          onChange={(evt, val) => this.setState({abbr: val})}
        />
        <TextField
          style={this.styles.textInput}
          floatingLabelText={formatMessage(messages.fullForm)}
          onChange={(evt, val) => this.setState({full: val})}
        />
        <RaisedButton
          label="Add"
          primary={true}
          onTouchTap={this.props.addAbbr.bind(this, this.state.abbr, this.state.full)}
        />
        <RaisedButton
          label="Delete"
          secondary={true}
          onTouchTap={this.props.deleteAbbrs.bind(this, this.state.selected)}
        />
      </div>
    );
  }

  componentDidMount(){
    document.getElementById("abbr").maxLength = 8;
  }

  componentDidUpdate(){
    document.getElementById("abbr").maxLength = 8;
  }
}

AbbreviationTab.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
  abbrs: selectMyAbbreviations(),
});

const mapDispatchToProps = (dispatch) => ({
  addAbbr: (abbr, full) => dispatch(addAbbreviation(abbr, full)),
  deleteAbbrs: (keys) => dispatch(deleteAbbreviations(keys)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(muiThemeable()(AbbreviationTab)));
