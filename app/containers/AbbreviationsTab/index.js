import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import muiThemeable from "material-ui/styles/muiThemeable";
import {selectAbbreviationsArray} from "./selectors";
import {deleteAbbreviations, addAbbreviation} from "./actions";
import {drawerHeight} from "../App/components";
import Dictionary from "../../components/Dictionary";

export class AbbreviationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    abbr: "",
    full: "",
    selected: [],
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <Dictionary
        id="abbr"
        entries={this.props.abbrs}
        keyLabel={formatMessage(messages.abbreviation)}
        valueLabel={formatMessage(messages.fullForm)}
        onSelect={(keys) => this.setState({selected: keys})}
        onDelete={this.props.delRegex.bind(this, this.state.selected)}
        onKeyChange={(evt, val) => this.setState({abbr: val})}
        onValueChange={(evt, val) => this.setState({full: val})}
        onAdd={this.props.addRegex.bind(this, this.state.abbr, this.state.full)}
        height={drawerHeight}/>
    );
  }
}

AbbreviationTab.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
  abbrs: selectAbbreviationsArray(),
});

const mapDispatchToProps = (dispatch) => ({
  addRegex: (abbr, full) => dispatch(addAbbreviation(abbr, full)),
  delRegex: (keys) => dispatch(deleteAbbreviations(keys)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(muiThemeable()(AbbreviationTab)));
