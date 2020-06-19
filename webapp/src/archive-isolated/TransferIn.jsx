import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function TransferIn() {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUuid] = useState('');
  const [id_card, setIdCard] = useState('');
  const [sn, setSn] = useState('');

  const handleTransferIn = async () => {
    if (!sn) {
      window.alert('请完整填写所需信息');
      return;
    }

    if (!window.confirm('确定要将当前数据转入档案库？')) return;

    const uuid = new URLSearchParams(location.search).get('uuid');

    let response = await window.fetch(`/api/archive-isolated/${id}?uuid=${uuid}`);
    let res = await response.json();

    const data = {
      id: parseInt(id, 10),
      uuid,
      sn,
      sn_repeal: res.content.sn_repeal.value,
      id_card: res.content.id_card,
      name: res.content.name,
      doc: res.content.doc.value,
    };

    response = await fetch('/api/archive/check-valid', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    if (res.content.length > 0) {
      window.alert('当前数据中的档案号或身份证与档案库中已有的档案相冲突');
      return;
    }
    response = await fetch('/api/archive/transfer-in/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = '#/';
  };

  useEffect(() => {
    setUuid(new URLSearchParams(location.search).get('uuid'));
    (async () => {
      const response = await window.fetch(`/api/archive-isolated/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
      const res = await response.json();
      setIdCard(res.content.id_card);
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
                  {id_card}
                </span>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                <strong>
                  <span className="text-muted">&gt;</span>
                  转入档案
                  <span className="text-muted">&lt;</span>
                </strong>
              </li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="text-center">
          <a href="#/新增" className="btn btn-sm btn-success">
            <i className="fa fa-fw fa-plus" />
            新增
          </a>
        </div>

        <div className="clearfix p-2" />
      </div>

      <div className="m-3" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-body">
            <p className="lead">
              <span className="text-danger">IMPORTANT:</span>
              <br />
              转入档案时，要输入新的档案号。
            </p>
            <div className="mb-3">
              <label className="form-label">档案号</label>
              <input type="text" value={sn} className="form-control" onChange={(event) => setSn(event.target.value)} />
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary" onClick={() => window.history.go(-1)}>
                返回
              </button>
            </div>

            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={handleTransferIn}>
                <i className="fa fa-fw fa-save" />
                转入
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
