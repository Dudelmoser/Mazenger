import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";

export class DictionaryTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  wrapperStyle = {
    padding: "1rem",
    textAlign: "center",
  }

  render() {

    return (
     <div style={this.wrapperStyle}>
g
     </div>
    );
  }
}

DictionaryTab.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DictionaryTab));
