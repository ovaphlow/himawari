import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faArchive, faSearch, faEdit,
} from '@fortawesome/free-solid-svg-icons';

import ComponentToolbar from './ComponentToolbar';

export default function Filter() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/archive/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setList(res.content);
  };

  return (
    <>
      <div className="container-fluid h-100">
        <div className="d-flex align-items-end justify-content-between">
          <h1>查询档案</h1>
          <ComponentToolbar />
        </div>

        <hr />

        <div className="d-flex justify-content-center">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="home.html" className="text-reset text-decoration-none">
                  <FontAwesomeIcon icon={faHome} fixedWidth />
                  首页
                </a>
              </li>

              <li className="breadcrumb-item">
                <a href="archive.html" className="text-reset text-decoration-none">
                  <FontAwesomeIcon icon={faArchive} fixedWidth />
                  档案管理
                </a>
              </li>

              <li className="breadcrumb-item active">
                <strong>
                  <FontAwesomeIcon icon={faSearch} fixedWidth />
                  查询档案
                </strong>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="m-3" />

      <div className="container-lg mt-4 h-100">
        <div className="card bg-dark shadow">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">档案号/身份证/姓名</span>
                  </div>
                  <input
                    type="text"
                    name="filter"
                    value={filter || ''}
                    className="form-control"
                    onChange={(event) => setFilter(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-auto">
                <div className="btn-group">
                  <button type="button" className="btn btn-info" onClick={handleFilter}>
                    <i className="fa fa-fw fa-search" />
                    查询
                  </button>

                  <button type="button" className="btn btn-secondary" onClick={() => window.location.reload(true)}>
                    <i className="fa fa-fw fa-refresh" />
                    重置
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-dark table-striped">
              <caption>档案列表</caption>
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>档案号</th>
                  <th>姓名</th>
                  <th>身份证</th>
                  <th>性别</th>
                  <th>出生日期</th>
                </tr>
              </thead>

              <tbody>
                {list.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#/${it.id}?uuid=${it.uuid}`}>
                        <FontAwesomeIcon icon={faEdit} fixedWidth />
                      </a>
                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>
                      {it.sn}
                      <br />
                      <span className="text-muted">{JSON.parse(it.sn_repeal.value).join(', ')}</span>
                    </td>
                    <td>{it.name}</td>
                    <td>{it.id_card}</td>
                    <td>{JSON.parse(it.doc.value).gender}</td>
                    <td>{JSON.parse(it.doc.value).bday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
