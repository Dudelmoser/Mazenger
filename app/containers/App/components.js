import styled from 'styled-components';
import {darkTheme} from "./themes";

const appTheme = darkTheme;
const leftDrawerWidth = 480;
const rightDrawerWidth = 480;
const titleHeight = 48;

const threadWidth = window.innerWidth - leftDrawerWidth - rightDrawerWidth;
const threadHeight = window.innerHeight - 2 * titleHeight;
const drawerHeight = window.innerHeight - titleHeight;

const CenterDiv = styled.div`
  position: absolute;
  left: ${leftDrawerWidth}px;
  top: 0;
  width: calc(100% - ${leftDrawerWidth + rightDrawerWidth}px);
  height: 100%;
  border-left: 1px solid rgba(255,255,255,0.05);
  border-right: 1px solid rgba(255,255,255,0.05);
`;

const ContainerDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  color: ${appTheme.palette.textColor};
  background: ${appTheme.container.background};
`;

const TitleDiv = styled.div`
  font-family: Raleway;
  font-weight: 300;
  font-size: 24px;
  height: ${titleHeight}px;
  line-height: ${titleHeight}px;
  text-align: center;
  color: ${appTheme.palette.primary1Color};
`;

const ThreadDiv = styled.div`
  width: ${threadWidth}px;
  height: ${threadHeight}px;
`;

const MessageDiv = styled.div`
  width: 100%;
  height: ${titleHeight}px;
  border-top: 1px solid rgba(255,255,255,0.05);
  paddingLeft: 1em;
  paddingRight: 1em;
`;

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