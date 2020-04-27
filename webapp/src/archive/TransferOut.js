import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'

export default function TransferOut() {
  const { id } = useParams()
  const [data, setData] = useState(0)
  const [dataIsolate, setDataIsolate] = useState({ reason: '' })

  useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/archive/${id}`)
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      setData(res.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setDataIsolate(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!!!dataIsolate.reason) {
      window.alert('请完整填写所需信息')
      return
    }
    const response = await fetch(`/api/archive/transfer-out`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(Object.assign(dataIsolate, data))
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#档案/查询'
  }

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">转出档案</h3>
        <hr />

        <Toolbar id={id} />

        <div className="card shadow">
          <div className="card-body">
            <div className="form-group">
              <label>转出原因</label>
              <input type="text" name="reason" value={dataIsolate.reason || ''}
                className="form-control"
                onChange={handleChange}
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
              <button type="button" className="btn btn-primary" onClick={handleSubmit} >
                <i className="fa fa-fw fa-check"></i>
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}