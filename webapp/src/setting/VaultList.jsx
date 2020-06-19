import React, { useEffect, useState } from 'react';
import ComponentToolbar from './ComponentToolbar';

export default function VaultList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/setting/?cat=档案库');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <div className="container-lg">
      <h1>
        <i className="fa fa-fw fa-map-marker" />
        档案库
        <span className="pull-right">
          <ComponentToolbar />
        </span>
      </h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item active" aria-current="page">
            档案库
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow mt-2">
        <div className="card-header">
          <a href="#/档案库/新增" className="btn btn-sm btn-success">
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
                <th>地址</th>
                <th>电话</th>
              </tr>
            </thead>

            <tbody>
              {data.map((it) => (
                <tr key={it.id}>
                  <td>
                    <a href={`#/档案库/${it.id}?uuid=${it.uuid}`}>
                      <i className="fa fa-fw fa-edit" />
                    </a>
                    <span className="pull-right">{it.id}</span>
                  </td>
                  <td>{it.name}</td>
                  <td>{JSON.parse(it.doc.value).addr}</td>
                  <td>{JSON.parse(it.doc.value).phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
