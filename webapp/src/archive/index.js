import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Title from '../components/Title'
import Navbar from '../components/Navbar'
import Filter from './Filter'
import Detail from './Detail'
import Capture from './Capture'
import PictureList from './PictureList'
import Picture from './Picture'
import TransferOut from './TransferOut'
import ListIsolate from './ListIsolate'
import DetailIsolate from './DetailIsolate'
import ImportData from './ImportData'

export default function Index() {
  useEffect(() => {
    console.info('权限验证')
  }, [])

  return (
    <Router>
      <>
        <Title />

        <Navbar category="archive" />

        <div className="container-fluid">
          <Switch>
            <Route exact path="/档案/查询"><Filter /></Route>
            <Route exact path="/档案/转入"><Detail category="转入" /></Route>
            <Route exact path="/档案/中转区"><ListIsolate /></Route>
            <Route exact path="/档案/中转区/:id"><DetailIsolate /></Route>
            <Route exact path="/档案/导入"><ImportData /></Route>
            <Route exact path="/档案/:id/扫描"><Capture /></Route>
            <Route exact path="/档案/:id/图像"><PictureList /></Route>
            <Route exact path="/档案/:master_id/图像/:id"><Picture /></Route>
            <Route exact path="/档案/:id"><Detail category="编辑" /></Route>
            <Route exact path="/档案/:id/转出"><TransferOut /></Route>
          </Switch>
        </div>
      </>
    </Router>
  )
}
