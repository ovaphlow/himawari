import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ComponentNavbar from '../ComponentNavbar';
import Filter from './Filter';
import Detail from './Detail';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <ComponentNavbar category="档案" />

      <Switch>
        <Route exact path="/"><Filter /></Route>
        <Route exact path="/转入"><Detail cat="转入" /></Route>
        <Route path="/:id"><Detail cat="编辑" /></Route>
      </Switch>
    </HashRouter>
  );
}
