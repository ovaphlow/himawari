import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'

export default function VaultRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/数据管理/档案库"><List /></Route>
        <Route exact path="/数据管理/档案库/新增"><Detail category="新增" /></Route>
        <Route path="/数据管理/档案库/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

const Toolbar = () => (
  <>
    <div className="btn-group">
      <a href="#数据管理/档案库/新增" className="btn btn-success btn-sm">
        <i className="fa fa-fw fa-plus"></i>
        新增
      </a>
    </div>

    <div className="btn-group pull-right">
      <a href="#数据管理/档案库" className="btn btn-secondary btn-sm">
        <i className="fa fa-fw fa-list"></i>
        列表
      </a>
    </div>
  </>
)

function List() {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/vault/`)
      const res = await response.json()
      setData(res.content)
    })()
  }, [])

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">
          <i className="fa fa-fw fa-map-marker"></i>
          档案库
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
                  <th>地址</th>
                  <th>电话</th>
                </tr>
              </thead>

              <tbody>
                {
                  data.map(it => (
                    <tr key={it.id}>
                      <td>
                        <a href={`#数据管理/档案库/${it.id}`}>
                          <i className="fa fa-fw fa-edit"></i>
                        </a>

                        <span className="pull-right">{it.id}</span>
                      </td>
                      <td>{it.name}</td>
                      <td>{it.addr}</td>
                      <td>{it.phone}</td>
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
  const [name, setName] = useState('')
  const [addr, setAddr] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async id => {
        const response = await window.fetch(`/api/vault/${id}`)
        const res = await response.json()
        setName(res.content.name)
        setAddr(res.content.addr)
        setPhone(res.content.phone)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (!!!name || !!!phone || !!!addr) {
      window.alert('请完整填写所需信息')
      return
    }
    const data = {
      name: name,
      addr: addr,
      phone: phone
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/vault/`, {
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
      const response = await window.fetch(`/api/vault/${id}`, {
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
    const response = await window.fetch(`/api/vault/${id}`, {
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
          <i className="fa fa-fw fa-map-marker"></i>
          {props.category}档案库
        </h3>

        <hr />

        <Toolbar />

        <div className="card shadow mt-2">
          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <label>名称</label>
                  <input type="text" value={name || ''}
                    className="form-control"
                    onChange={event => setName(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-4 offset-4">
                <div className="form-group">
                  <label>电话</label>
                  <input type="tel" value={phone || ''} autoComplete="tel"
                    className="form-control"
                    onChange={event => setPhone(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>地址</label>
              <input type="text" value={addr || ''} autoComplete="address-level4"
                className="form-control"
                onChange={event => setAddr(event.target.value)}
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
