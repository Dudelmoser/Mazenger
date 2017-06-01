import React from "react";
import {injectIntl, intlShape} from "react-intl";
import {Scrollbars} from "react-custom-scrollbars";
import {Drawer, Tab, Tabs} from "material-ui";
import {barHeight} from "../../containers/App/components";

/*
A tabbed sidebar.
*/
function Sidebar(props) {
  const {formatMessage} = props.intl;

  return (
    <Drawer
      open={true}
      docked={true}
      width={props.width}
      zDepth={0}
      openSecondary={props.right}>

      <Tabs
        value={props.activeTab}
        onChange={props.onTabChange}
      >
        {props.tabs.map((tab, key) =>
          <Tab
            data-tooltip={formatMessage(tab.tooltip)}
            onActive={tab.onClick}
            disabled={tab.disabled}
            icon={tab.icon}
            value={key}
            key={key}
          >
            {tab.scrollbar
              ? <Scrollbars
                autoHide={true}
                style={{height: props.height - barHeight}}>
                {tab.content}
              </Scrollbars>
              : <div>{tab.content}</div>
            }
          </Tab>
        )}
      </Tabs>

    </Drawer>
  );
}

Sidebar.propTypes = {
  tabs: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  intl: intlShape.isRequired,
  right: React.PropTypes.bool,
  activeTab: React.PropTypes.number,
  onTabChange: React.PropTypes.func,
};

export default injectIntl(Sidebar);
