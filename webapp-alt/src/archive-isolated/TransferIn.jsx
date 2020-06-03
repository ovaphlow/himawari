import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function TransferIn() {
  const { id } = useParams();
  const location = useLocation();
  const [sn, setSn] = useState('');

  const handleTransferIn = async () => {
    //
  };

  return (
    <div className="container">
      <h1>档案中转库</h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item">
            <a href="#/">档案中转库</a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            转入档案库
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-body">
          <p className="lead">
            <span className="text-danger">IMPORTANT:</span>
            <br />
            转入档案时，要输入新的档案号。
          </p>
          <div className="form-group">
            <label>档案号</label>
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
  );
}
