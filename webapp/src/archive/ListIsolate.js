import React, { useState, useEffect } from 'react'

import Sidebar from './components/Sidebar'

export default function ListIsolate() {
  const [data, setData] = useState([])
  const [filter_sn, setFilterSN] = useState('')
  const [filter_id_card, setFilterIdCard] = useState('')
  const [filter_name, setFilterName] = useState('')

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`/api/archive/isolate/`)
      const res = await response.json()
      setData(res.content)
    })()
  }, [])

  const handleFilter = async () => {
    setData([])
    const response = await fetch(`/api/archive/isolate/filter`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        sn: filter_sn,
        id_card: filter_id_card,
        name: filter_name
      })
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
                <input type="text" name="sn" value={filter_sn || ''}
                  className="form-control"
                  onChange={event => setFilterSN(event.target.value)} />
              </div>

              <div className="form-group col">
                <label>身份证</label>
                <input type="text" name="id_card" value={filter_id_card || ''}
                  className="form-control"
                  onChange={event => setFilterIdCard(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>姓名</label>
                <input type="text" name="name" value={filter_name || ''}
                  className="form-control"
                  onChange={event => setFilterName(event.target.value)}
                />
              </div>
            </div>

            <div className="btn-group">
              <button type="button" className="btn btn-outline-secondary"
                onClick={() => window.location.reload(true)}
              >
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
            <table className="table table-hover table-bordered">
              <thead className="thead-light">
                <tr>
                  <th className="text-right">序号</th>
                  <th>档案号</th>
                  <th>附加档案号</th>
                  <th>身份证</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>出生日期</th>
                </tr>
              </thead>

              <tbody>
                {data.map(it => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#档案/${it.id}?opt=中转区`}>
                        <i className="fa fa-fw fa-edit"></i>
                      </a>

                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>
                      {it.sn}
                    </td>
                    <td>{it.sn_alt}</td>
                    <td>{it.id_card}</td>
                    <td>{it.name}</td>
                    <td>{it.gender}</td>
                    <td>{it.birthday}</td>
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
