import React, { useEffect, useState } from 'react';

import ComponentToolbar from './ComponentToolbar';
import useAuth from '../useAuth';

export default function Detail() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [dept, setDept] = useState('');
  const [auth_super, setAuthSuper] = useState(false);

  useEffect(() => {
    window.console.info(auth);
    setUsername(auth.username);
    setDept(auth.dept);
    setAuthSuper(auth.auth_super);
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">
                <strong>
                  <span className="text-muted">&gt;</span>
                  当前用户
                  <span className="text-muted">&lt;</span>
                </strong>
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
          <div className="card-body">
            <div className="row">
              <div className="col mb-3">
                <label className="form-label">用户名</label>
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div className="col mb-3">
                <label className="form-label">部门</label>
                <input
                  type="text"
                  value={dept}
                  className="form-control"
                  onChange={(event) => setDept(event.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">权限：管理员</label>
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
    </div>
  );
}
