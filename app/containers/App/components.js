import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";

const leftDrawerWidth = 480;
const rightDrawerWidth = 480;
const titleHeight = 48;

const threadWidth = window.innerWidth - leftDrawerWidth - rightDrawerWidth;
const threadHeight = window.innerHeight - 2 * titleHeight;
const drawerHeight = window.innerHeight - titleHeight;

const ContainerDiv = muiThemeable()(styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  color: ${props => props.muiTheme.palette.textColor};
  background: ${props => props.muiTheme.palette.canvasColor};
`);

// logo must eventually be replaced with svg or pixel graphic
const TitleDiv = muiThemeable()(styled.div`
  font-family: Raleway, Roboto;
  font-weight: 300;
  font-size: 24px;
  height: ${titleHeight}px;
  line-height: ${titleHeight}px;
  text-align: center;
  color: ${props => props.muiTheme.palette.primary1Color};
  background: ${props => props.muiTheme.palette.canvasColor};
`);

const CenterDiv = muiThemeable()(styled.div`
  position: absolute;
  left: ${leftDrawerWidth}px;
  top: 0;
  width: calc(100% - ${leftDrawerWidth + rightDrawerWidth}px);
  height: 100%;
  border-left: 1px solid ${props => props.muiTheme.palette.borderColor};
  border-right: 1px solid ${props => props.muiTheme.palette.borderColor};
`);

const ThreadDiv = styled.div`
  width: ${threadWidth}px;
  height: ${threadHeight}px;
`;

const MessageDiv = muiThemeable()(styled.div`
  width: 100%;
  height: ${titleHeight}px;
  paddingLeft: 1em;
  paddingRight: 1em;
  border-top: ${props => props.muiTheme.palette.borderColor};
`);

const tabBtnStyle = {
  width: "100%",
  cursor: "pointer",
  color: "inherit",
}

export {
  CenterDiv, ContainerDiv, TitleDiv, ThreadDiv, MessageDiv,
  threadWidth, threadHeight, leftDrawerWidth, rightDrawerWidth, drawerHeight,
  tabBtnStyle,
}
