import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import ComponentToolbar from './ComponentToolbar';
import ComponentAction from './ComponentAction';

export default function TransferOut() {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUuid] = useState('');
  const [sn, setSN] = useState('');
  const [reason, setReason] = useState('');

  const handleSave = async () => {
    const uuid = new URLSearchParams(location.search).get('uuid');
    let response = await window.fetch(`/api/archive/${id}?uuid=${uuid}`);
    let res = await response.json();
    const data = { ...res.content };
    const array = JSON.parse(res.content.sn_repeal.value);
    array.push(res.content.sn);
    data.sn_repeal = JSON.stringify(array);
    delete data.sn;
    const doc = JSON.parse(res.content.doc.value);
    doc.reason = reason;
    data.doc = JSON.stringify(doc);
    response = await window.fetch('/api/archive-isolated/transfer-in/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await response.json();
    window.location = '#/';
  };

  useEffect(() => {
    setUuid(new URLSearchParams(location.search).get('uuid'));
    (async () => {
      const response = await window.fetch(`/api/archive/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
      const res = await response.json();
      setSN(res.content.sn);
    })();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <span role="link" style={{ cursor: 'pointer' }} onClick={() => { window.location = '#/'; }}>
                  查询档案
                </span>
              </li>

              <li className="breadcrumb-item">
                <span role="link" style={{ cursor: 'pointer' }} onClick={() => { window.location = `#/${id}?uuid=${uuid}`; }}>
                  {sn}
                </span>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                <span className="text-muted">&gt;</span>
                转出
                <span className="text-muted">&lt;</span>
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
        <ComponentAction archive_id={id} archive_uuid={new URLSearchParams(location.search).get('uuid')} />

        <div className="m-2" />

        <div className="card bg-dark shadow">
          <div className="card-body">
            <p className="lead">
              <span className="text-danger">
                注意：
              </span>
              <br />
              转出档案时，档案号合并到附加档案号内。
            </p>
            <div className="mb-3">
              <label className="form-label">转出原因</label>
              <input type="text" value={reason} className="form-control" onChange={(event) => setReason(event.target.value)} />
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary" onClick={() => window.history.go(-1)}>
                后退
              </button>
            </div>

            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <i className="fa fa-fw fa-save" />
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
