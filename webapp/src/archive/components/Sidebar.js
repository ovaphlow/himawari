import React from 'react'

const Sidebar = props => (
  <div className="list-group">
    <h6 className="text-muted text-center mt-2">选择功能</h6>

    <a href="#档案/转入"
        className={`list-group-item list-group-item-action ${props.category === 'transfer-in' ? 'active' : ''}`}
    >
      <i className="fa fa-fw fa-plus"></i>
      转入档案
    </a>

    <a href="#档案/查询"
        className={`list-group-item list-group-item-action ${props.category === 'filter' ? 'active' : ''}`}
    >
      <i className="fa fa-fw fa-search"></i>
      查询档案
    </a>

    <a href="#档案/中转区"
        className={`list-group-item list-group-item-action ${props.category === 'isolate' ? 'active' : ''}`}
    >
      <i className="fa fa-fw fa-folder-open-o"></i>
      档案中转区
    </a>

    <a href="#档案/导入"
      className={`list-group-item list-group-item-action ${props.category === 'import' ? 'active' : ''}`}
    >
      <i className="fa fa-fw fa-upload"></i>
      导入档案
    </a>
  </div>
)

export default Sidebar
