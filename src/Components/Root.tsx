import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './Main';
import Admin from './Admin';

export default function Root(): ReactElement {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin" component={Admin} />
      </div>
    </Router>
  );
}
