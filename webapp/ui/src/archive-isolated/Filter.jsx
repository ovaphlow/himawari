import React, { useState } from 'react';

export default function Filter() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/archive-isolated/', {
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
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <strong>
                  <span className="text-muted">&gt;</span>
                  查询档案
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
                        <i className="fa fa-fw fa-edit" />
                      </a>
                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>
                      {JSON.parse(it.sn_repeal.value).join(', ')}
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
    </div>
  );
}
