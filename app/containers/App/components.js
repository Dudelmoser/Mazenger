import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";

const leftDrawerWidth = window.innerWidth * .23;
const rightDrawerWidth = window.innerWidth * .23;
const titleHeight = 48;

const threadWidth = window.innerWidth - leftDrawerWidth - rightDrawerWidth;
const threadHeight = window.innerHeight;
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
  z-index: 10;
  position: absolute;
  width: 100%;
  font-family: Raleway, Roboto;
  font-weight: 400;
  font-size: 24px;
  height: ${titleHeight}px;
  line-height: ${titleHeight}px;
  text-align: center;
  color: ${props => props.muiTheme.palette.primary1Color};
  background: ${props => props.muiTheme.palette.semitrans};
`);

const CenterDiv = muiThemeable()(styled.div`
  position: absolute;
  left: ${leftDrawerWidth}px;
  width: calc(100% - ${leftDrawerWidth + rightDrawerWidth}px);
  top: 0;
  height: 100%;
  border-left: 1px solid ${props => props.muiTheme.palette.borderColor};
  border-right: 1px solid ${props => props.muiTheme.palette.borderColor};
`);

const ThreadDiv = styled.div`
  width: ${threadWidth}px;
  height: 100%;
`;

const MessageDiv = muiThemeable()(styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${titleHeight}px;
  padding-left: 8px;
  background: ${props => props.muiTheme.palette.semitrans};
`);

// make component instead
const tabBtnStyle = {
  width: "100%",
  cursor: "pointer",
  color: "inherit",
}

export {
  CenterDiv, ContainerDiv, TitleDiv, ThreadDiv, MessageDiv,
  threadWidth, threadHeight, leftDrawerWidth, rightDrawerWidth, drawerHeight, titleHeight,
  tabBtnStyle,
}
