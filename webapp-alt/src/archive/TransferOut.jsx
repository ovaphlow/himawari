import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import ComponentToolbar from './ComponentToolbar';
import ComponentAction from './ComponentAction';

export default function TransferOut() {
  const { id } = useParams();
  const location = useLocation();
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

  return (
    <div className="container">
      <h1>
        档案
        <span className="pull-right">
          <ComponentToolbar />
        </span>
      </h1>

      <hr />

      <div className="card bg-dark shadow">
        <div className="card-header">
          <ComponentAction archive_id={id} archive_uuid={new URLSearchParams(location.search).get('uuid')} />
        </div>

        <div className="card-body">
          <p className="lead">
            <span className="text-danger">
              IMPORTANT:
            </span>
            <br />
            转出档案时，档案号合并到附加档案号内。
          </p>
          <div className="form-group">
            <label>REASON</label>
            <input type="text" value={reason} className="form-control" onChange={(event) => setReason(event.target.value)} />
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-secondary" onClick={() => window.history.go(-1)}>
              BACK
            </button>
          </div>

          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              <i className="fa fa-fw fa-save" />
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
