import React, { useEffect, useState } from 'react';

import useAuth from '../useAuth';
import ComponentToolbar from './ComponentToolbar';

export default function MessageList() {
  const auth = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/message/?user_id=${auth.id}`);
      const res = await response.json();
      window.console.info(res);
      setList(res.content || []);
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
                  系统消息
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
          <div className="card-body">
            <table className="table table-dark table-striped table-bordered">
              <caption>未读消息</caption>
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>发送方</th>
                  <th>标题</th>
                </tr>
              </thead>
              <tbody>
                {list.map((it) => (
                  <tr key={it.id}>
                    <td rowSpan="2" className="text-right">
                      {it.id}
                      <span className="float-left">
                        <a href={`#/${it.id}?uuid=${it.uuid}`}>
                          <i className="fa fa-fw fa-edit" />
                        </a>
                      </span>
                    </td>
                    <td>{JSON.parse(it.doc.value).send_by}</td>
                    <td>{JSON.parse(it.doc.value).title}</td>
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
