import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Detail from './Detail';
import Picture from './Picture';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/:id"><Detail /></Route>
        <Route path="/:id/图像"><Picture /></Route>
      </Switch>
    </HashRouter>
  );
}
