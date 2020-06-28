import React, { useState } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Index />, document.getElementById('app'));

function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
            <input type="text" value={username} className="form-control" onChange={(event) => setUsername(event.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">密码</label>
            <input type="password" value={password} className="form-control" onChange={(event) => setPassword(event.target.value)} />
          </div>
        </div>

        <div className="card-footer">
          <button type="button" className="btn btn-block btn-primary">
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
