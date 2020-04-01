import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './Main';

export default function Root(): ReactElement {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Main} />
      </div>
    </Router>
  );
}
