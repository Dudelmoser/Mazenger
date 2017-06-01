import React from 'react';

import messages from './messages';
import {FormattedMessage} from 'react-intl';

/*
This page is shown when the user visits a url that doesn't have a route
*/
export default function NotFoundPage() {
  return (
    <FormattedMessage {...messages.header} />
  );
}
