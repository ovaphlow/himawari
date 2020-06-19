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
    <div className="container-lg">
      <h1>
        导入档案
        <span className="pull-right">
          <ComponentToolbar />
        </span>
      </h1>

      <hr />

      <div className="card bg-dark shadow">
        <div className="card-header">
          <a href={xlsxTemplate}>导入档案表格模板</a>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <VaultPicker name="vault_id" value={vault_id} onChange={(event) => setVaultId(parseInt(event.target.value, 10))} />
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
              <i className="fa fa-fw fa-check" />
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
