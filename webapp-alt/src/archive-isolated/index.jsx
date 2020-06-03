import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ComponentNavbar from '../ComponentNavbar';
import Filter from './Filter';
import Detail from './Detail';
import TransferIn from './TransferIn';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <ComponentNavbar category="档案中转库" />

      <Switch>
        <Route exact path="/"><Filter /></Route>
        <Route exact path="/新增"><Detail cat="新增" /></Route>
        <Route exact path="/:id"><Detail cat="编辑" /></Route>
        <Route path="/:id/转入"><TransferIn /></Route>
      </Switch>
    </HashRouter>
  );
}
