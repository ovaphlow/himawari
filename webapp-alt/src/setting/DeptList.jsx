import React, { useEffect, useState } from 'react';
import ComponentToolbar from './ComponentToolbar';

export default function DeptList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/setting/?cat=部门');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <div className="container">
      <h1>
        <i className="fa fa-fw fa-sitemap" />
        部门
        <span className="pull-right">
          <ComponentToolbar />
        </span>
      </h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item active" aria-current="page">部门</li>
        </ol>
      </nav>

      <div className="card bg-dark shadow mt-2">
        <div className="card-header">
          <a href="#/部门/新增" className="btn btn-sm btn-success">
            <i className="fa fa-fw fa-plus" />
            新增
          </a>
        </div>

        <div className="card-body">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th className="text-right">序号</th>
                <th>名称</th>
                <th>电话</th>
                <th>位置</th>
              </tr>
            </thead>

            <tbody>
              {data.map((it) => (
                <tr key={it.id}>
                  <td>
                    <a href={`#/部门/${it.id}?uuid=${it.uuid}`}>
                      <i className="fa fa-fw fa-edit" />
                    </a>
                    <span className="pull-right">{it.id}</span>
                  </td>
                  <td>{it.name}</td>
                  <td>{JSON.parse(it.doc.value).tel}</td>
                  <td>{JSON.parse(it.doc.value).addr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
