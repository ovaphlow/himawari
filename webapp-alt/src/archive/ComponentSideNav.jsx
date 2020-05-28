import React from 'react';

export default function Sidebar(props) {
  const { category } = props;
  return (
    <div className="list-group">
      <h6 className="text-muted text-center mt-2">选择功能</h6>

      <a
        href="#/转入"
        className={`list-group-item list-group-item-action ${category === 'transfer-in' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-plus" />
        转入档案
      </a>

      <a
        href="#/"
        className={`list-group-item list-group-item-action ${category === 'filter' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-search" />
        查询档案
      </a>

      <a
        href="#/中转区"
        className={`list-group-item list-group-item-action ${category === 'isolate' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-folder-open-o" />
        档案中转区
      </a>

      <a
        href="#/导入"
        className={`list-group-item list-group-item-action ${category === 'import' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-upload" />
        导入档案
      </a>
    </div>
  );
}
