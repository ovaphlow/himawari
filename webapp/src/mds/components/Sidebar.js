import React from 'react'

export default function Sidebar(props) {
  return (
    <div className="list-group">
      <h6 className="text-muted text-center mt-2">选择功能</h6>

      <a href="#数据管理/操作记录"
          className={`list-group-item list-group-item-action ${props.category === 'journal' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-history"></i>
        操作记录
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#数据管理/用户"
          className={`list-group-item list-group-item-action ${props.category === 'user' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-users"></i>
        用户
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#数据管理/部门"
          className={`list-group-item list-group-item-action ${props.category === 'dept' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-sitemap"></i>
        部门
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>

      <a href="#数据管理/档案库"
          className={`list-group-item list-group-item-action ${props.category === 'vault' ? 'active' : ''}`}
      >
        <i className="fa fa-fw fa-map-marker"></i>
        档案库
        <span className="pull-right">
          <i className="fa fa-fw fa-angle-right"></i>
        </span>
      </a>
    </div>
  )
}
