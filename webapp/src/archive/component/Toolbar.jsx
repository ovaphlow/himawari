import React from 'react';

export default function Toolbar(props) {
  const { id } = props;

  return (
    <div className="mb-2">
      <div className="btn-group">
        <a href={`#档案/${id}/转出`} className="btn btn-sm btn-outline-warning">
          <i className="fa fa-fw fa-mail-forward" />
          转出
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href={`#档案/${id}/扫描`} className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-camera" />
          扫描
        </a>

        <a href={`#档案/${id}/图像`} className="btn btn-sm btn-outline-info">
          <i className="fa fa-fw fa-image" />
          查看档案图像
        </a>

        <a href={`#档案/${id}`} className="btn btn-sm btn-outline-primary">
          <i className="fa fa-fw fa-archive" />
          档案信息
        </a>
      </div>
    </div>
  );
}
