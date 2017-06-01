import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";

/*
This file contains simple wrapper components without any logic.
*/

export const barHeight = 48;
export const drawerWidthPerc = .23;

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
  height: ${props => props.height}px;
  line-height: ${props => props.height}px;
  text-align: center;
  color: ${props => props.muiTheme.palette.primary1Color};
  background: ${props => props.muiTheme.palette.semitrans};
`);

export const CenterDiv = muiThemeable()(styled.div`
  position: absolute;
  left: ${props => props.left}px;
  width: ${props => props.width}px);
  top: 0;
  height: 100%;
  border-left: 1px solid ${props => props.muiTheme.palette.borderColor};
  border-right: 1px solid ${props => props.muiTheme.palette.borderColor};
`);

export const ThreadDiv = styled.div`
  width: ${props => props.width}px;
  height: 100%;
`;

export const MessageDiv = muiThemeable()(styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.height}px;
  padding-left: 8px;
  background: ${props => props.muiTheme.palette.semitrans};
`);

// make component instead
export const tabBtnStyle = {
  width: "100%",
  cursor: "pointer",
  color: "inherit",
}
