import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import ComponentNavbar from '../ComponentNavbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Detail from './Detail';
import UpdatePassword from './UpdatePassword';
import MessageList from './MessageList';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  useEffect(() => {
    const auth = window.sessionStorage.getItem('auth');
    if (!auth) {
      window.location = SIGN_IN_URL;
    }
  }, []);

  return (
    <HashRouter>
      <ComponentNavbar category="当前用户" />

      <Switch>
        <Route exact path="/"><Detail /></Route>
        <Route path="/登录"><SignIn /></Route>
        <Route path="/注册"><SignUp /></Route>
        <Route path="/修改密码"><UpdatePassword /></Route>
        <Route path="/消息"><MessageList /></Route>
      </Switch>
    </HashRouter>
  );
}
