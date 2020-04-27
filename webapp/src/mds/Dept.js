import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'

export default function DeptRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/数据管理/部门"><List /></Route>
        <Route exact path="/数据管理/部门/新增"><Detail category="新增" /></Route>
        <Route path="/数据管理/部门/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

export function DeptPicker(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/common/dept/`)
      const res = await response.json()
      setList(res.content)
    })()
  }, [])

  return (
    <div className="form-group">
      <label>部门</label>
      <select name={props.name} value={props.value} className="form-control" onChange={props.onChange}>
        <option value="0">未选择</option>
        {list.map(it => (
          <option key={it.id} value={it.id}>{it.v}</option>
        ))}
      </select>
    </div>
  )
}

const Toolbar = () => (
  <>
    <div className="btn-group">
      <a href="#数据管理/部门/新增" className="btn btn-success btn-sm">
        <i className="fa fa-fw fa-plus"></i>
        新增
      </a>
    </div>

    <div className="btn-group pull-right">
      <a href="#数据管理/部门" className="btn btn-secondary btn-sm">
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
      const response = await window.fetch(`/api/common/dept/`)
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
          <i className="fa fa-fw fa-sitemap"></i>
          部门
        </h3>

        <hr />

        <Toolbar />

        <div className="card shadow mt-2">
          <div className="card-body">
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="text-right">序号</th>
                  <th>名称</th>
                  <th>用户数量</th>
                  <th>操作记录</th>
                </tr>
              </thead>

              <tbody>
                {
                  list.map(it => (
                    <tr key={it.id}>
                      <td>
                        <a href={`#数据管理/部门/${it.id}`}>
                          <i className="fa fa-fw fa-edit"></i>
                        </a>

                        <span className="pull-right">
                          {it.id}
                        </span>
                      </td>
                      <td>{it.v}</td>
                      <td>0</td>
                      <td>
                        <a href={`#数据管理/操作记录/部门/${it.id}`}>
                          <i className="fa fa-fw fa-history"></i>
                        </a>
                      </td>
                    </tr>
                  ))
                }
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
  const [v, setV] = useState('')
  const [remark, setRemark] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async id => {
        const response = await window.fetch(`/api/common/dept/${id}`)
        const res = await response.json()
        setV(res.content.v)
        setRemark(res.content.remark)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (!!!v) {
      window.alert('请完整填写所需信息')
      return
    }
    const data = {
      v: v,
      remark: remark
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common/dept/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/common/dept/${id}`, {
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
    const response = await window.fetch(`/api/common/dept/${id}`, {
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
          <i className="fa fa-fw fa-sitemap"></i>
          {props.category}部门
        </h3>

        <hr />

        <Toolbar />

        <div className="card shadow mt-2">
          <div className="card-body">
            <div className="row">
              <div className="form-group col-4">
                <label>名称</label>
                <input type="text" name="name" value={v || ''} autoComplete="name"
                  className="form-control"
                  onChange={event => setV(event.target.value)}
                />
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
