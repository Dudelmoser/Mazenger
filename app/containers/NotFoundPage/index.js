/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';

import messages from './messages';
import {FormattedMessage} from 'react-intl';

export default function NotFound() {
  return (
    <FormattedMessage {...messages.header} />
  );
}
