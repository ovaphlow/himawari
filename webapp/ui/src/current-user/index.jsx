import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ComponentNavbar from '../ComponentNavbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Detail from './Detail';
import UpdatePassword from './UpdatePassword';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <ComponentNavbar category="当前用户" />

      <Switch>
        <Route exact path="/"><Detail /></Route>
        <Route path="/登录"><SignIn /></Route>
        <Route path="/注册"><SignUp /></Route>
        <Route path="/修改密码"><UpdatePassword /></Route>
      </Switch>
    </HashRouter>
  );
}
