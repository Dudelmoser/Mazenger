import { injectGlobal } from 'styled-components';

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
  
  td:first-child, th:first-child {
    padding-left: 16px !important;
  }
  
  .hidden {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 2em;
    height: 2em;
    padding: 0;
    border: none;
    outline: none;
    box-shadow: none;
    overflow: hidden;
    color: transparent;
    background: transparent;
  }
  
  .hidden::selection {
    color: transparent;
    background: transparent;
  }
  
  div[tabindex]:focus {
    outline: none;
  }
`;
