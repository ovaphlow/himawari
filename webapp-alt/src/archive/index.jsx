import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import ComponentNavbar from '../ComponentNavbar';
import Filter from './Filter';
import Detail from './Detail';
import TransferOut from './TransferOut';
import PictureList from './PictureList';
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
    window.console.info(auth);
    window.console.info(SIGN_IN_URL);
    if (!auth) {
      window.location = SIGN_IN_URL;
      return;
    }
  }, []);

  return (
    <HashRouter>
      <ComponentNavbar category="档案" />

      <Switch>
        <Route exact path="/"><Filter /></Route>
        <Route exact path="/转入"><Detail cat="转入" /></Route>
        <Route exact path="/:id"><Detail cat="编辑" /></Route>
        <Route path="/:id/转出"><TransferOut /></Route>
        <Route path="/:id/图像"><PictureList /></Route>
        <Route path="/:id/扫描"><Capture /></Route>
      </Switch>
    </HashRouter>
  );
}
