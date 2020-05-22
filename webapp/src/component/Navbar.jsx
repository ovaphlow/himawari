import React from 'react';

export default function Navbar(props) {
  const { category } = props;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top title-color" style={{ marginTop: '-8px' }}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${category === 'home' ? 'active' : ''}`}>
            <a className="nav-link" href="#/">
              <i className="fa fa-fw fa-home" />
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>

          <li className={`nav-item ${category === 'archive' ? 'active' : ''}`}>
            <a className="nav-link" href="#档案/查询">
              <i className="fa fa-fw fa-file-archive-o" />
              档案管理
            </a>
          </li>

          <li className={`nav-item ${category === 'touch' ? 'active' : ''}`}>
            <a className="nav-link" href="#触摸屏">
              <i className="fa fa-fw fa-hand-pointer-o" />
              触摸屏查询终端
            </a>
          </li>

          <li className={`nav-item ${category === 'api-journal' ? 'active' : ''}`}>
            <a className="nav-link" href="#API调用">
              <i className="fa fa-fw fa-history" />
              API调用记录
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${category === 'mds' ? 'active' : ''}`}>
            <a className="nav-link" href="#数据管理/操作记录">
              <i className="fa fa-fw fa-cogs" />
              数据管理
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
