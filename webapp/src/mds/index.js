import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Title from '../components/Title'
import Navbar from '../components/Navbar'
import JournalList from './JournalList'
import DeptRouter from './Dept'
import UserRouter from './User'
import VaultRouter from './Vault'

export default function Index() {
  useEffect(() => {
    console.info('权限验证')
  }, [])

  return (
    <Router>
      <>
        <Title />

        <Navbar category="mds" />

        <div className="container-fluid">
          <Switch>
            <Route path="/数据管理/操作记录"><JournalList /></Route>
            <Route path="/数据管理/用户"><UserRouter /></Route>
            <Route path="/数据管理/部门"><DeptRouter /></Route>
            <Route path="/数据管理/档案库"><VaultRouter /></Route>
          </Switch>
        </div>
      </>
    </Router>
  )
}
