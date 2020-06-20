import React from 'react';

export default function ComponentToolbar() {
  return (
    <div className="btn-group">
      <a href="#/转入" className="btn btn-sm btn-success">
        <i className="fa fa-fw fa-plus" />
        转入档案
      </a>

      <a href="#/导入" className="btn btn-sm btn-warning">
        <i className="fa fa-fw fa-upload" />
        导入档案
      </a>

      <a href="#/" className="btn btn-sm btn-info">
        <i className="fa fa-fw fa-search" />
        查询档案
      </a>
    </div>
  );
}
