import React, { useState } from 'react'

import Sidebar from './components/Sidebar'
import VaultPicker from '../mds/components/VaultPicker'

export default function ImportData() {
  const [data, setData] = useState({vault_id: 0})

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpload = async () => {
    let formData = new FormData()
    let el = document.querySelector('#customFileLangHTML')

    formData.append('vault_id', data.vault_id)
    formData.append('file', el.files[0])

    const response = await fetch(`/api/archive/import-data`, {
      method: 'POST',
      body: formData
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
  }

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar category="import" />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">导入档案</h3>
        <hr />

        <div className="card shadow">
          <div className="card-header">
            <a href="assets/导入档案表格模板.xlsx">导入档案表格模板</a>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <VaultPicker name="vault_id" value={data.vault_id} handleChange={handleChange} />
              </div>

              <div className="col">
                <div className="form-group">
                  <label>&nbsp;</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFileLangHTML" />
                    <label className="custom-file-label" htmlFor="customFileLangHTML" data-browse="选择文件">后缀名为xlsx的Excel表格文件</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={handleUpload}>
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