import React, { useEffect, useState } from 'react';
import ComponentToolbar from './ComponentToolbar';

export default function Detail() {
  const [username, setUsername] = useState('');
  const [dept, setDept] = useState(0);
  const [auth_super, setAuthSuper] = useState(false);

  useEffect(() => {
    (async () => {
      const auth = JSON.parse(window.sessionStorage.getItem('auth'));
      setUsername(auth.username);
      setDept(auth.dept);
      setAuthSuper(auth.auth_super);
    })();
  }, []);

  return (
    <div className="container-lg">
      <h1>
        当前用户
        <span className="pull-right">
          <ComponentToolbar />
        </span>
      </h1>

      <hr />

      <div className="card bg-dark shadow">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>用户名</label>
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>部门</label>
                <input
                  type="text"
                  value={dept}
                  className="form-control"
                  onChange={(event) => setDept(parseInt(event.target.value, 10))}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>权限：管理员</label>
            <input
              type="text"
              value={auth_super ? '是' : '否'}
              className="form-control"
              onChange={(event) => setAuthSuper(event.target.value === '是')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
