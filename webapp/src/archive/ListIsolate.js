import React, { useState, useEffect } from 'react'

import Sidebar from './components/Sidebar'

export default function ListIsolate() {
  const [data, setData] = useState([])
  const [filterParams, setFilterParams] = useState({
    sn: '',
    identity: '',
    name: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/archive/isolate/`)
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      setData(res.content)
    }
    fetchData()
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setFilterParams(prev => ({ ...prev, [name]: value }))
  }

  const handleFilter = async () => {
    const response = await fetch(`/api/archive/isolate/filter`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(filterParams)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    setData(res.content)
  }

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar category="isolate" />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">档案中转区</h3>
        <hr />

        <div className="card shadow">
          <div className="card-header">
            <div className="row">
              <div className="form-group col">
                <label>档案号</label>
                <input type="text" name="sn" className="form-control" onChange={handleChange} />
              </div>

              <div className="form-group col">
                <label>身份证</label>
                <input type="text" name="identity" className="form-control" onChange={handleChange} />
              </div>

              <div className="form-group col">
                <label>姓名</label>
                <input type="text" name="name" className="form-control" onChange={handleChange} />
              </div>
            </div>

            <div className="btn-group">
              <button type="button" className="btn btn-secondary" onClick={() => window.location.reload(true)}>
                <i className="fa fa-fw fa-refresh"></i>
                重置
              </button>
            </div>

            <div className="btn-group pull-right">
              <button type="button" className="btn btn-success" onClick={handleFilter}>
                <i className="fa fa-fw fa-search"></i>
                查询
              </button>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th>档案号</th>
                  <th>其它档案号</th>
                  <th>身份证</th>
                  <th>姓名</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data.map(it => (
                  <tr key={it.id}>
                    <td>
                      {it.sn}
                      <span className="pull-right text-primary">
                        <i className="fa fa-fw fa-edit"
                          onClick={() => window.location = `#档案/中转区/${it.id}`}
                        ></i>
                      </span>
                    </td>
                    <td>{it.sn_alt}</td>
                    <td>{it.identity}</td>
                    <td>{it.name}</td>
                    <td>
                      <span className="text-danger pull-right">
                        <i className="fa fa-fw fa-download"></i>
                        转入档案
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="m-3"></div>
      </div>
    </div>
  )
}