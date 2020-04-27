import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Form from './components/Form'

export default function DetailIsolate() {
  const { id } = useParams()
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/archive/isolate/${id}`)
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
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    if (!!!data.sn || !!!data.identity || !!!data.name) {
      window.alert('请完整填写所需信息')
      return
    }
    const response = await fetch(`/api/archive/isolate/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#档案/中转区'
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await fetch(`/api/archive/isolate/${id}`, { method: 'DELETE' })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#档案/中转区'
  }

  const handleTransferIn = async () => {
    if (!!!data.sn || !!!data.identity || !!!data.name) {
      window.alert('请完整填写所需信息')
      return
    }
    if (!!!window.confirm('确定要将当前数据转入档案库？')) return
    let response = await fetch(`/api/archive/check-valid`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        sn: data.sn,
        identity: data.identity
      })
    })
    let res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    if (res.content.length > 0) {
      window.alert('当前数据中的档案号或身份证与档案库中已有的档案相冲突')
      return
    }
    response = await fetch(`/api/archive/transfer-in`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#档案/中转区'
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
          <div className="card-body">
            <Form data={data} handleChange={handleChange} />

            <div className="form-group">
              <label>转出原因</label>
              <input type="text" name="reason" value={data.reason || ''}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-outline-secondary" onClick={() => window.history.go(-1)}>
                返回
              </button>

              <button type="button" className="btn btn-outline-danger" onClick={handleRemove}>
                删除
              </button>

              <button type="button" className="btn btn-outline-info" onClick={handleTransferIn}>
                转入档案
              </button>
            </div>

            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                <i className="fa fa-fw fa-check"></i>
                确定
              </button>
            </div>
          </div>
        </div>

        <div className="m-3"></div>
      </div>
    </div>
  )
}