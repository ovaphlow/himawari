import React, { useState } from 'react';
import md5 from 'blueimp-md5';
import { useEffect } from 'react/cjs/react.development';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!username || !password) {
      window.alert('请完整填写所需信息');
      return;
    }

    const response = await window.fetch('/api/current-user/sign-in/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        username,
        password: md5(password),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.sessionStorage.setItem('auth', JSON.stringify(res.content));
    window.location = 'index.html';
  };

  useEffect(() => {
    window.sessionStorage.clear();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card bg-dark shadow col-6 col-lg-4">
        <div className="card-header text-center">
          <h1>
            #TITLE#
            <br />
            <small className="text-muted">登录</small>
          </h1>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">用户名</label>
            <input
              type="text"
              value={username}
              className="form-control input-underscore"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">密码</label>
            <input
              type="password"
              value={password}
              className="form-control input-underscore"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <div className="card-footer">
          <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
            <i className="fa fa-fw fa-sign-in" />
            登录
          </button>

          <div className="m-2" />

          <p className="text-center mt-3 mb-0">
            <a href="#/注册">
              <i className="fa fa-fw fa-user-plus" />
              注册帐号
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
