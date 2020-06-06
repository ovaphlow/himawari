import React from 'react';

export default function ComponentToolbar() {
  return (
    <div className="btn-group">
      <a href="#/" className="btn btn-outline-info">
        用户信息
      </a>

      <a href="#/修改密码" className="btn btn-outline-info">
        修改密码
      </a>

      <a href="#/登录" className="btn btn-outline-info">
        <i className="fa fa-fw fa-sign-out" />
        退出登录
      </a>
    </div>
  );
}
