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
    <div className="container">
      <h1>
        档案中转库
        <span className="pull-right">
          <a href="#/新增" className="btn btn-sm btn-outline-success">
            <i className="fa fa-fw fa-plus" />
            新增
          </a>
        </span>
      </h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item active">
            档案中转库
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-header">
          <div className="form-row">
            <div className="col-auto">
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
              <div className="btn-group col-auto">
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
                    {it.sn}
                    <br />
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
  );
}