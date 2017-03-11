import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, TextField, RaisedButton, FlatButton} from "material-ui";
import messages from "./messages";
import muiThemeable from "material-ui/styles/muiThemeable";
import {selectMyAbbreviations} from "./selectors";
import {deleteAbbreviations, addAbbreviation} from "./actions";
import emoji from "react-easy-emoji";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentClear from "material-ui/svg-icons/content/clear";
import {drawerHeight} from "../App/components";
import Scrollbars from "react-custom-scrollbars";

export class AbbreviationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    abbr: "",
    full: "",
    selected: [],
  }

  // Add abbr line: 100% - 96px (abbr) - 2*16px (margin) - 44px (btn)
  styles = {
    scrollbar: {
      height: drawerHeight - 100,
    },
    wrapper: {
      padding: "1rem",
    },
    input: {
      width: "calc(50% - 54px)",
    },
    delBtn: {
      minWidth: 56,
      marginTop: 28,
      marginBottom: 8,
      verticalAlign: "top",
      marginRight: 8,
    },
    abbrCol: {
      width: 172,
    }
  }

  render() {
    const {formatMessage} = this.props.intl;

    const styles = {
      delIcon: {
        color: this.props.muiTheme.flatButton.secondaryTextColor
      },
      addIcon: {
        color: this.props.muiTheme.palette.primary1Color,
      },
      inputBtn: {
        minWidth: 44,
        marginTop: 28,
        marginBottom: 8,
        verticalAlign: "top",
        borderRadius: 0,
        borderBottom: "1px solid " + this.props.muiTheme.palette.borderColor,
      },
    };

    return (
      <div>
        <Scrollbars
          autoHide={true}
          style={this.styles.scrollbar}>
          <div
            style={this.styles.wrapper}>
          <Table
            multiSelectable={true}
            onRowSelection={(keys) => this.setState({selected: keys})}>
            <TableHeader
              displaySelectAll={true}>
              <TableRow>
                <TableHeaderColumn style={this.styles.abbrCol}>{formatMessage(messages.abbreviation)}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage(messages.fullForm)}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover={true}>
              {this.props.abbrs.map((abbr) => {
                return (
                <TableRow
                  key={abbr}>
                  <TableRowColumn style={this.styles.abbrCol}>{abbr[0]}</TableRowColumn>
                  <TableRowColumn>{emoji(abbr[1])}</TableRowColumn>
                </TableRow>)
              })}
            </TableBody>
          </Table>
          </div>
        </Scrollbars>
        <div style={this.styles.wrapper}>
          <FlatButton
            style={this.styles.delBtn}
            onTouchTap={this.props.deleteAbbrs.bind(this, this.state.selected)}>
            <ContentClear style={styles.delIcon}/>
          </FlatButton>
          <TextField
            id="abbr"
            style={this.styles.input}
            floatingLabelText={formatMessage(messages.abbreviation)}
            onChange={(evt, val) => this.setState({abbr: val})}
          />
          <TextField
            style={this.styles.input}
            floatingLabelText={formatMessage(messages.fullForm)}
            onChange={(evt, val) => this.setState({full: val})}
          />
          <FlatButton
            style={styles.inputBtn}
            onTouchTap={this.props.addAbbr.bind(this, this.state.abbr, this.state.full)}>
            <ContentAdd style={styles.addIcon}/>
          </FlatButton>
        </div>
      </div>
    );
  }

  // workaround to limit the input word length (must be refreshed)
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
