import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import ComponentNavbar from '../ComponentNavbar';
import Filter from './Filter';
import Detail from './Detail';
import TransferOut from './TransferOut';
import PictureList from './PictureList';
import Picture from './Picture';
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
        <Route exact path="/"><Filter /></Route>
        <Route exact path="/转入"><Detail cat="转入" /></Route>
        <Route exact path="/:id"><Detail cat="编辑" /></Route>
        <Route path="/:id/转出"><TransferOut /></Route>
        <Route exact path="/:id/图像"><PictureList /></Route>
        <Route path="/:archive_id/图像/:id"><Picture /></Route>
        <Route path="/:id/扫描"><Capture /></Route>
      </Switch>
    </HashRouter>
  );
}
