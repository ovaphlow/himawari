import React, { useState } from 'react';

import ComponentToolbar from './ComponentToolbar';

export default function UserFilter() {
  const [filter, setFilter] = useState('');
  const [list, setList] = useState([]);

  const handleFilter = async () => {
    setList([]);
    const response = await window.fetch('/api/user/', {
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
    <div className="container-lg">
      <h1>
        <i className="fa fa-fw fa-users" />
        用户
        <span className="pull-right">
          <ComponentToolbar />
        </span>
      </h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item active" aria-current="page">用户</li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">姓名/部门</span>
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
            <thead>
              <tr>
                <th className="text-right">序号</th>
                <th>用户</th>
                <th>部门</th>
                <th>管理员</th>
              </tr>
            </thead>

            <tbody>
              {list.map((it) => (
                <tr key={it.id}>
                  <td className="text-right">
                    <span className="pull-left">
                      <a href={`#/用户/${it.id}?uuid=${it.uuid}`}>
                        <i className="fa fa-fw fa-edit" />
                      </a>
                    </span>
                    {it.id}
                  </td>
                  <td>{it.username}</td>
                  <td>{it.dept}</td>
                  <td>{it.auth_super ? '是' : '否'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
