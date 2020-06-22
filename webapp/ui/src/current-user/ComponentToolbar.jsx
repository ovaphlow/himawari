import React from 'react';

export default function ComponentToolbar() {
  return (
    <div className="btn-group">
      <a href="#/" className="btn btn-sm btn-info">
        <i className="fa fa-fw fa-info-circle" />
        用户信息
      </a>

      <a href="#/消息" className="btn btn-sm btn-info">
        <i className="fa fa-fw fa-comments-o" />
        系统消息
      </a>

      <a href="#/修改密码" className="btn btn-sm btn-warning">
        <i className="fa fa-fw fa-key" />
        修改密码
      </a>

      <a href="#/登录" className="btn btn-sm btn-danger">
        <i className="fa fa-fw fa-sign-out" />
        退出登录
      </a>
    </div>
  );
}
