import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import Archive from './archive'
import Mds from './mds'
import TouchScreen from './touch-screen/Home'
import APIAccessJournal from './api-access-journal/Home'

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/档案" component={Archive} />
        <Route path="/数据管理" component={Mds} />
        <Route path="/触摸屏"><TouchScreen /></Route>
        <Route path="/API调用"><APIAccessJournal /></Route>
      </Switch>
    </HashRouter>
  )
}
