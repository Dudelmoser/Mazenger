import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import muiThemeable from "material-ui/styles/muiThemeable";
import {selectReversedAutoText} from "./selectors";
import {deleteAbbreviations, addAbbreviation} from "./actions";
import Dictionary from "../../components/Dictionary";

/*
An editable dictionary of abbreviations and their full form.
*/
export class AutoText extends React.PureComponent {

  /* New autotext is cached inside the internal state to avoid flooding the persistent store. */
  state = {
    abbr: "",
    full: "",
    selected: [],
  };

  /* Selections and autotext are cached until they are passed to the action creators for persistent changes. */
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
        onAdd={this.props.addRegex.bind(this, this.state.abbr, this.state.full)}
        onKeyChange={(evt, val) => this.setState({abbr: val})}
        onValueChange={(evt, val) => this.setState({full: val})}
        height={this.props.height}/>
    );
  }
}

AutoText.propTypes = {
  intl: intlShape.isRequired,
  height: React.PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  abbrs: selectReversedAutoText(),
});

const mapDispatchToProps = (dispatch) => ({
  addRegex: (abbr, full) => dispatch(addAbbreviation(abbr, full)),
  delRegex: (keys) => dispatch(deleteAbbreviations(keys)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(muiThemeable()(AutoText)));
