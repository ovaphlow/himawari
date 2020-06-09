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
    <div className="container">
      <h1>登录</h1>

      <hr />

      <div className="card bg-dark shadow mt-5 col-8 offset-2 col-md-6 offset-md-3">
        <div className="card-body">
          <div className="form-group">
            <label>用户名</label>
            <input type="text" value={username} className="form-control" onChange={(event) => setUsername(event.target.value)} />
          </div>

          <div className="form-group">
            <label>密码</label>
            <input type="password" value={password} className="form-control" onChange={(event) => setPassword(event.target.value)} />
          </div>
        </div>

        <div className="card-footer">
          <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
            <i className="fa fa-fw fa-sign-in" />
            登录
          </button>

          <div className="m-2" />

          <p className="text-center mt-3 mb-0">
            <a href="#/注册">注册帐号</a>
          </p>
        </div>
      </div>
    </div>
  );
}
