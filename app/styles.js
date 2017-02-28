import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
`;

// replaces the default title-attribute tooltip
