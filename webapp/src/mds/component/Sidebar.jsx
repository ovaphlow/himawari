import React from 'react';

export default function Sidebar(props) {
  const { category } = props;

  return (
    <div className="list-group">
      <h6 className="text-muted text-center mt-2">选择功能</h6>

      <a
        href="#数据管理/操作记录"
        className={`list-group-item list-group-item-action ${category === 'journal' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-history" />
        操作记录
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right" />
        </span>
      </a>

      <a
        href="#数据管理/用户"
        className={`list-group-item list-group-item-action ${category === 'user' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-users" />
        用户
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right" />
        </span>
      </a>

      <a
        href="#数据管理/部门"
        className={`list-group-item list-group-item-action ${category === 'dept' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-sitemap" />
        部门
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right" />
        </span>
      </a>

      <a
        href="#数据管理/档案库"
        className={`list-group-item list-group-item-action ${category === 'vault' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-map-marker" />
        档案库
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right" />
        </span>
      </a>
    </div>
  );
}
