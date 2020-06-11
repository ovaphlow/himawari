import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import ComponentNavbar from '../ComponentNavbar';
import List from './List';
import Detail from './Detail';
import Capture from './Capture';

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
      <ComponentNavbar category="档案" />

      <Switch>
        <Route exact path="/"><List /></Route>
        <Route exact path="/:id"><Detail /></Route>
        <Route path="/:id/扫描"><Capture /></Route>
      </Switch>
    </HashRouter>
  );
}
