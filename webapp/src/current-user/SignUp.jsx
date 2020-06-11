import React, { useState } from 'react';
import md5 from 'blueimp-md5';
import { v5 as uuidv5 } from 'uuid';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSignUp = async () => {
    if (!username || !password || !password2) {
      window.alert('请完整输入所需信息');
      return;
    }

    if (password !== password2) {
      window.alert('两次输入的密码不一致');
      return;
    }

    const response = await window.fetch('/api/current-user/sign-up', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        uuid: uuidv5(username, uuidv5.DNS),
        username,
        password: md5(password),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = '#/登录';
  };

  return (
    <div className="container">
      <h1>注册</h1>

      <hr />

      <div className="card bg-dark shadow mt-5 col-6 offset-3">
        <div className="card-body">
          <div className="form-group">
            <label>用户名</label>
            <input type="text" value={username} className="form-control" onChange={(event) => setUsername(event.target.value)} />
          </div>

          <div className="form-group">
            <label>密码</label>
            <input type="password" value={password} className="form-control" onChange={(event) => setPassword(event.target.value)} />
          </div>

          <div className="form-group">
            <label>重复密码</label>
            <input type="password" value={password2} className="form-control" onChange={(event) => setPassword2(event.target.value)} />
          </div>
        </div>

        <div className="card-footer">
          <button type="button" className="btn btn-block btn-primary" onClick={handleSignUp}>
            <i className="fa fa-fw fa-user-plus" />
            注册
          </button>

          <div className="m-2" />

          <p className="text-center mt-3 mb-0">
            <a href="#/登录">登录</a>
          </p>
        </div>
      </div>
    </div>
  );
}
