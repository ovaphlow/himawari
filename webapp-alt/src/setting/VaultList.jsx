import React, { useEffect, useState } from 'react';

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/vault/');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <div className="container">
      <h3>
        <i className="fa fa-fw fa-map-marker" />
        档案库
      </h3>

      <hr />

      <div className="card bg-dark shadow mt-2">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
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
                    <a href={`#/档案库/${it.id}`}>
                      <i className="fa fa-fw fa-edit" />
                    </a>
                    <span className="pull-right">{it.id}</span>
                  </td>
                  <td>{it.name}</td>
                  <td>{it.addr}</td>
                  <td>{it.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
