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
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">
                <span className="text-muted">&gt;</span>
                <strong>
                  档案库
                </strong>
                <span className="text-muted">&lt;</span>
              </li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="text-center">
          <ComponentToolbar />
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-header">
            <a href="#/档案库/新增" className="btn btn-sm btn-light">
              <i className="fa fa-fw fa-plus" />
              新增
            </a>
          </div>

          <div className="card-body">
            <table className="table table-dark table-hover">
              <caption>档案库</caption>
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
    </div>
  );
}
