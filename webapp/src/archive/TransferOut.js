import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'

export default function TransferOut() {
  const { id } = useParams()
  const [data, setData] = useState(0)
  const [reason, setReason] = useState('')

  useEffect(() => {
    ;(async id => {
      const response = await fetch(`/api/archive/${id}`)
      const res = await response.json()
      setData(res.content)
    })(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (!!!reason) {
      window.alert('请完整填写所需信息')
      return
    }
    const response = await fetch(`/api/archive/transfer-out`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(Object.assign({
        reason: reason
      }, data))
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
              <input type="text" value={reason || ''}
                className="form-control"
                onChange={event => setReason(event.target.value)}
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
