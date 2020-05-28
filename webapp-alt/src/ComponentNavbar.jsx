import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentNavbar({ category }) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fix-top sticky-top">
      <a href="home.html" className="navbar-brand">#TITLE#</a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="切换导航"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${category === '首页' ? 'active' : ''}`}>
            <a className="nav-link" href="home.html">
              <i className="fa fa-fw fa-home" />
              首页
              <span className="sr-only">(current)</span>
            </a>
          </li>

          <li className={`nav-item ${category === '档案' ? 'active' : ''}`}>
            <a className="nav-link" href="archive.html">
              <i className="fa fa-fw fa-file-archive-o" />
              档案管理
            </a>
          </li>

          <li className={`nav-item ${category === '触摸屏' ? 'active' : ''}`}>
            <a className="nav-link" href="touch-screen.html">
              <i className="fa fa-fw fa-hand-pointer-o" />
              触摸屏查询终端
            </a>
          </li>

          <li className={`nav-item ${category === 'API' ? 'active' : ''}`}>
            <a className="nav-link" href="api-journal.html">
              <i className="fa fa-fw fa-history" />
              API调用记录
            </a>
          </li>
        </ul>

        <ul className="navbar-nav pull-right">
          <li className={`nav-item ${category === 'mds' ? 'active' : ''}`}>
            <a className="nav-link" href="setting.html">
              <i className="fa fa-fw fa-cogs" />
              数据管理
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

ComponentNavbar.propTypes = {
  category: PropTypes.string.isRequired,
};
