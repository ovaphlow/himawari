import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { v5 as uuidv5 } from 'uuid';

import ComponentToolbar from './ComponentToolbar';

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [dept_id, setDeptId] = useState(0);
  const [auth_super, setAuthSuper] = useState(false);
  const [dept_list, setDeptList] = useState([]);

  const handleSave = async () => {
    if (!username) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      uuid: uuidv5(username, uuidv5.DNS), username, dept_id, auth_super,
    };

    const response = await window.fetch(`/api/user/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/user/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  useEffect(() => {
    (async () => {
      let response = await window.fetch('/api/setting/?cat=部门');
      let res = await response.json();
      setDeptList(res.content);

      response = await window.fetch(`/api/user/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
      res = await response.json();
      setUsername(res.content.username);
      setDeptId(res.content.dept_id);
      setAuthSuper(res.content.auth_super);
    })();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">
                <a href="#/用户" className="text-light">
                  用户
                </a>
              </li>
              <li className="breadcrumb-item active">
                <span className="text-muted">&gt;</span>
                <strong>
                  编辑
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
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">用户名</label>
                  <input type="text" value={username} className="form-control" onChange={(event) => setUsername(event.target.value)} />
                </div>
              </div>

              <div className="col">
                <div className="mb-3">
                  <label className="form-label">部门</label>
                  <select
                    value={dept_id.toString()}
                    className="form-control"
                    onChange={(event) => setDeptId(parseInt(event.target.value, 10))}
                  >
                    <option value="0">未选择</option>
                    {dept_list.map((it) => (
                      <option key={it.id} value={it.id}>{it.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">权限：管理员</label>
              <select
                value={auth_super}
                className="form-control"
                onChange={(event) => setAuthSuper(event.target.value === 'true')}
              >
                <option value="false">否</option>
                <option value="true">是</option>
              </select>
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
                返回
              </button>
            </div>

            <div className="btn-group pull-right">
              <button type="button" className="btn btn-danger" onClick={handleRemove}>
                <i className="fa fa-fw fa-trash" />
                删除
              </button>

              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <i className="fa fa-fw fa-save" />
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
