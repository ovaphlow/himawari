import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import md5 from 'blueimp-md5'

import Sidebar from './components/Sidebar'
import { DeptPicker } from './Dept'

export default function UserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/数据管理/用户"><List /></Route>
        <Route exact path="/数据管理/用户/新增"><Detail category="新增" /></Route>
        <Route path="/数据管理/用户/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

const Toolbar = () => (
  <>
    <div className="btn-group">
      <a href="#数据管理/用户/新增" className="btn btn-success btn-sm">
        <i className="fa fa-fw fa-plus"></i>
        新增
      </a>
    </div>

    <div className="btn-group pull-right">
      <a href="#数据管理/用户" className="btn btn-secondary btn-sm">
        <i className="fa fa-fw fa-list"></i>
        列表
      </a>
    </div>
  </>
)

function List() {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/user/`)
      const res = await response.json()
      setList(res.content)
    })()
  }, [])

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">
          <i className="fa fa-fw fa-users"></i>
          用户
        </h3>

        <hr />

        <Toolbar />

        <div className="card shadow mt-2">
          <div className="card-header" style={{ display: 'none' }}>
            查询条件
          </div>

          <div className="card-body">
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="text-right">序号</th>
                  <th>姓名</th>
                  <th>用户名</th>
                  <th>管理员权限</th>
                  <th>操作记录</th>
                </tr>
              </thead>

              <tbody>
                {list.map(it => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#数据管理/用户/${it.id}`}>
                        <i className="fa fa-fw fa-edit"></i>
                      </a>

                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>{it.name}</td>
                    <td>{it.username}</td>
                    <td>{it.super === 1 ? '是' : '否'}</td>
                    <td>
                      <a href={`#数据管理/操作记录/用户/${it.id}`}>
                        <i className="fa fa-fw fa-history"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Detail(props) {
  const { id } = useParams()
  const [dept_id, setDeptID] = useState(0)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [remark, setRemark] = useState('')
  const [auth_super, setAuthSuper] = useState(0)

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async id => {
        const response = await window.fetch(`/api/user/${id}`)
        const res = await response.json()
        setDeptID(res.content.dept_id)
        setUsername(res.content.username)
        setName(res.content.name)
        setRemark(res.content.remark)
        setAuthSuper(res.content.auth_super)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (!!!name || !!!username) {
      window.alert('请完整填写所需信息')
      return
    }
    const data = {
      dept_id: dept_id,
      username: username,
      name: name,
      remark: remark,
      auth_super: auth_super
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.assign({
          password: md5('1234')
        }, data))
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    }
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await window.fetch(`/api/user/${id}`, {
      method: 'DELETE'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.history.go(-1)
  }

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">
          <i className="fa fa-fw fa-users"></i>
          {props.category}用户
        </h3>

        <hr />

        <Toolbar />

        <div className="card shadow mt-2">
          <div className="card-body">
            <div className="row">
              <div className="form-group col-4">
                <label>姓名</label>
                <input type="text" name="name" value={name || ''} autoComplete="name"
                  className="form-control"
                  onChange={event => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label>用户名</label>
                <input type="text" name="username" value={username || ''} autoComplete="username"
                  className="form-control"
                  onChange={event => setUsername(event.target.value)}
                />
              </div>

              <div className="col">
                <DeptPicker name="dept_id" value={dept_id || '0'}
                  onChange={event => setDeptID(event.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-3 col-lg-2">
                <label>权限：管理员</label>
                <select name="auth_super" value={auth_super || '0'} className="form-control"
                  onChange={event => setAuthSuper(event.target.value)}
                >
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>备注</label>
              <input type="text" name="remark" value={remark || ''}
                className="form-control"
                onChange={event => setRemark(event.target.value)}
              />
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-outline-secondary"
                onClick={() => window.history.go(-1)}
              >
                返回
              </button>
            </div>

            <div className="btn-group pull-right">
              {props.category === '编辑' && (
                <button type="button" className="btn btn-outline-danger"
                  onClick={handleRemove}
                >
                  <i className="fa fa-fw fa-trash-o"></i>
                  删除
                </button>
              )}

              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <i className="fa fa-fw fa-check"></i>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
