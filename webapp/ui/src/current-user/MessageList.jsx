import React, { useEffect, useState } from 'react';

import useAuth from '../useAuth';
import ComponentToolbar from './ComponentToolbar';

export default function MessageList() {
  const auth = useAuth();
  const [list, setList] = useState([]);

  const handleMarkRead = async (event) => {
    const id = event.target.getAttribute('data-id');
    const uuid = event.target.getAttribute('data-uuid');
    const response = await window.fetch(`/api/message/${id}/mark-read?uuid=${uuid}`, {
      method: 'PUT',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location.reload(true);
  };

  const handleListUnread = async () => {
    const response = await window.fetch(`/api/message/?user_id=${auth.id}&status=未读`);
    const res = await response.json();
    setList(res.content || []);
  };

  const handleListRead = async () => {
    setList([]);
    const response = await window.fetch(`/api/message/?user_id=${auth.id}&status=已读`);
    const res = await response.json();
    setList(res.content || []);
  };

  useEffect(() => {
    handleListUnread();
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
        <div className="btn-group">
          <button type="button" className="btn btn-sm btn-info" onClick={handleListUnread}>
            <i className="fa fa-fw fa-commenting" />
            未读消息
          </button>
          <button type="button" className="btn btn-sm btn-secondary" onClick={handleListRead}>
            <i className="fa fa-fw fa-comments-o" />
            已读消息
          </button>
        </div>

        <div className="m-3" />

        <div className="card bg-dark shadow">
          <div className="card-body">
            <ul className="list-group">
              {list.map((it) => (
                <li key={it.id} className="list-group-item list-group-item-action list-group-item-dark">
                  <div className="d-flex w-100 justify-content-between">
                    <h4 className="mb-1">{it.title}</h4>
                    <small className="text-primary">{it.send_by}</small>
                  </div>
                  <p className="mb-1">{it.content}</p>
                  <small className="text-muted">{it.date_time}</small>
                  {it.status === '未读' && (
                    <div>
                      <hr />
                      <div className="btn-group float-right">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          data-id={it.id}
                          data-uuid={it.uuid}
                          onClick={handleMarkRead}
                        >
                          <i className="fa fa-fw fa-check" data-id={it.id} data-uuid={it.uuid} />
                          已读
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
