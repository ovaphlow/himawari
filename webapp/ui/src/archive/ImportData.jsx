import React, { useState } from 'react';

import ComponentToolbar from './ComponentToolbar';
import xlsxTemplate from '../assets/导入档案表格模板.xlsx';
import VaultPicker from '../ComponentVaultPicker';

export default function ImportData() {
  const [vault_id, setVaultId] = useState(0);

  const handleUpload = async () => {
    if (!vault_id) {
      window.alert('请选择档案所在地');
      return;
    }
    const formData = new FormData();
    const el = document.querySelector('#customFileLangHTML');

    formData.append('vault_id', vault_id);
    formData.append('file', el.files[0]);

    const response = await fetch('/api/archive/import-data', {
      method: 'POST',
      body: formData,
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.alert('数据已上传至服务器分析处理，请稍后查看。');
    window.location.reload(true);
  };

  return (
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <strong>
                  <span className="text-muted">&gt;</span>
                  导入档案
                  <span className="text-muted">&lt;</span>
                </strong>
              </li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="text-center">
          <ComponentToolbar />
        </div>

        <div className="clearfix p-2" />
      </div>

      <div className="m-3" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-header">
            <a href={xlsxTemplate}>导入档案表格模板</a>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <VaultPicker name="vault_id" value={vault_id} onChange={(event) => setVaultId(parseInt(event.target.value, 10))} />
              </div>
            </div>

            <div className="row">
              <div className="col mb-4">
                <div className="form-file">
                  <div className="m-4" />
                  <input type="file" className="form-file-input" id="customFile" />
                  <label className="form-file-label" htmlFor="customFile">
                    <span className="form-file-text">选择 Excel (.xlsx) 文件...</span>
                    <span className="form-file-button">浏览</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={handleUpload}>
                <i className="fa fa-fw fa-check" />
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
