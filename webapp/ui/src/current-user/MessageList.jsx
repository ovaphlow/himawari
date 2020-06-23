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
            <ul className="list-group">
              {list.map((it) => (
                <li key={it.id} className="list-group-item list-group-item-action list-group-item-dark">
                  <div className="d-flex w-100 justify-content-between">
                    <h4 className="mb-1">{JSON.parse(it.doc.value).title}</h4>
                    <small className="text-primary">{JSON.parse(it.doc.value).send_by}</small>
                  </div>
                  <p className="mb-1">{JSON.parse(it.doc.value).content}</p>
                  <small className="text-muted">{JSON.parse(it.doc.value).datime}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
