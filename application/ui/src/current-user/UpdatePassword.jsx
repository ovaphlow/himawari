import React, { useState } from 'react';
import md5 from 'blueimp-md5';

import ComponentToolbar from './ComponentToolbar';

export default function UpdatePassword() {
  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_password2, setNewPassword2] = useState('');

  const handleChangePassword = async () => {
    if (!current_password || !new_password || !new_password2) {
      window.alert('请完整填写所需信息');
      return;
    }

    if (current_password === new_password) {
      window.alert('新旧密码不能一致');
      return;
    }

    if (new_password !== new_password2) {
      window.alert('两次输入的新密码不一致');
      return;
    }

    const auth = JSON.parse(window.sessionStorage.getItem('auth'));

    const data = {
      id: auth.id,
      uuid: auth.uuid,
      current_password: md5(current_password),
      new_password: md5(new_password),
    };

    const response = await window.fetch('/api/current-user/update-password/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = '#/登录';
  };

  return (
    <>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="#/" className="text-light">
                  当前用户
                </a>
              </li>
              <li className="breadcrumb-item active">
                <span className="text-muted">&gt;</span>
                <strong>
                  修改密码
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

        <div className="clearfix p-2" />
      </div>

      <div className="m-3" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-header">
            <span className="lead text-danger">修改密码后需要重新登录</span>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">当前密码</label>
                  <input
                    type="password"
                    value={current_password}
                    autoComplete="current-password"
                    className="form-control"
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="mb-3">
                  <label className="form-label">新密码</label>
                  <input
                    type="password"
                    value={new_password}
                    autoComplete="new-password"
                    className="form-control"
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="mb-3">
                  <label className="form-label">重复新密码</label>
                  <input
                    type="password"
                    value={new_password2}
                    autoComplete="new-password"
                    className="form-control"
                    onChange={(event) => setNewPassword2(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={handleChangePassword}>
                <i className="fa fa-fw fa-save" />
                修改密码
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
