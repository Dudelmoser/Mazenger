import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";

export const leftDrawerWidth = window.innerWidth * .23;
export const rightDrawerWidth = window.innerWidth * .23;
export const titleHeight = 48;

export const threadWidth = window.innerWidth - leftDrawerWidth - rightDrawerWidth;
export const threadHeight = window.innerHeight;
export const drawerHeight = window.innerHeight - titleHeight;

export const ContainerDiv = muiThemeable()(styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  color: ${props => props.muiTheme.palette.textColor};
  background: ${props => props.muiTheme.palette.canvasColor};
`);

// logo must eventually be replaced with svg or pixel graphic
export const TitleDiv = muiThemeable()(styled.div`
  z-index: 10;
  position: absolute;
  width: 100%;
  font-weight: 400;
  font-size: 24px;
  height: ${titleHeight}px;
  line-height: ${titleHeight}px;
  text-align: center;
  color: ${props => props.muiTheme.palette.primary1Color};
  background: ${props => props.muiTheme.palette.semitrans};
`);

export const CenterDiv = muiThemeable()(styled.div`
  position: absolute;
  left: ${leftDrawerWidth}px;
  width: calc(100% - ${leftDrawerWidth + rightDrawerWidth}px);
  top: 0;
  height: 100%;
  border-left: 1px solid ${props => props.muiTheme.palette.borderColor};
  border-right: 1px solid ${props => props.muiTheme.palette.borderColor};
`);

export const ThreadDiv = styled.div`
  width: ${threadWidth}px;
  height: 100%;
`;

export const MessageDiv = muiThemeable()(styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${titleHeight}px;
  padding-left: 8px;
  background: ${props => props.muiTheme.palette.semitrans};
`);

// make component instead
export const tabBtnStyle = {
  width: "100%",
  cursor: "pointer",
  color: "inherit",
}
