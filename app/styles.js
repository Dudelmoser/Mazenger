import { injectGlobal } from 'styled-components';

const ttBg = "rgba(127, 127, 127, 0.5)";

/* eslint no-unused-expressions: 0 */
// language=LESS
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    font-family: Roboto, 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  button, html [type="button"],[type="reset"], [type="submit"] {
    -webkit-appearance: none;
  }
  
  b, strong {
    font-weight: 500 !important;
  }
  
  aside {
    opacity: 0.5;
    font-size: 0.7em;
  }
  
  h5 {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 0 !important;
  }
 
  button[data-tooltip]:hover:after {
    font-size: 0.75em;
    content: attr(data-tooltip);
    padding: 8px;
    color: white;
    position: absolute;
    right: 0%;
    top: 100%;
    z-index: 1000;
    background-color: rgba(0,0,0,0.5);
  }
  
  .lifted {
    position: relative !important;
    top: -3px;
  }
  
  //noinspection CssInvalidPropertyValue
  .tooltip {
    color: white !important;
    height: 30px !important;
    font-size: 1rem !important;
    padding: 4px 16px !important;
    background-color: ${ttBg} !important;
    border-radius: 0 !important;
    &.place-left {
      &:after {
        border-left-color: ${ttBg} !important;
      }
    }        
    &.place-top {
      &:after {
        border-top-color: ${ttBg} !important;
      }
    }   
    &.place-right {
      &:after {
        border-right-color: ${ttBg} !important;
      }
    } 
    &.place-bottom {
      &:after {
        border-bottom-color: ${ttBg} !important;
      }
    }
  }
`;

// replaces the default title-attribute tooltip
