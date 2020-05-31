import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ComponentNavbar from '../ComponentNavbar';
import VaultList from './VaultList';
import VaultDetail from './VaultDetail';
import DeptList from './DeptList';
import DeptDetail from './DeptDetail';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <ComponentNavbar category="系统设置" />

      <Switch>
        <Route exact path="/档案库"><VaultList /></Route>
        <Route exact path="/档案库/新增"><VaultDetail cat="新增" /></Route>
        <Route path="/档案库/:id"><VaultDetail cat="编辑" /></Route>
        <Route exact path="/部门"><DeptList /></Route>
        <Route exact path="/部门/新增"><DeptDetail cat="新增" /></Route>
        <Route path="/部门/:id"><DeptDetail cat="编辑" /></Route>
      </Switch>
    </HashRouter>
  );
}
