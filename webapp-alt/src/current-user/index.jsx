import React  from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ComponentNavbar from '../ComponentNavbar';
import SignIn from './SignIn';
import SignUp from './SignUp';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <ComponentNavbar category="" />

      <Switch>
        <Route path="/登录"><SignIn /></Route>
        <Route path="/注册"><SignUp /></Route>
      </Switch>
    </HashRouter>
  );
}
