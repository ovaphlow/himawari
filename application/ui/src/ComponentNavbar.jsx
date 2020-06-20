import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentNavbar({ category }) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top sticky-top">
      <div className="container-fluid">
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
            <li className="nav-item">
              <a className={`nav-link ${category === '首页' ? 'active' : ''}`} href="home.html">
                <i className="fa fa-fw fa-home" />
                首页
                <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${category === '档案' ? 'active' : ''}`} href="archive.html">
                <i className="fa fa-fw fa-book" />
                档案管理
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${category === '档案中转库' ? 'active' : ''}`} href="archive-isolated.html">
                <i className="fa fa-fw fa-file-archive-o" />
                档案中转库
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${category === '触摸屏' ? 'active' : ''}`} href="touch-screen.html">
                <i className="fa fa-fw fa-hand-pointer-o" />
                触摸屏查询终端
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${category === 'API' ? 'active' : ''}`} href="api-journal.html">
                <i className="fa fa-fw fa-history" />
                API调用记录
              </a>
            </li>
          </ul>

          <ul className="navbar-nav pull-right">
            <li className="nav-item">
              <a className={`nav-link ${category === '系统设定' ? 'active' : ''}`} href="setting.html#/档案库">
                <i className="fa fa-fw fa-cogs" />
                系统设定
              </a>
            </li>

            <li className="nav-item">
              <a className={`nav-link ${category === '当前用户' ? 'active' : ''}`} href="current-user.html#/">
                <i className="fa fa-fw fa-user" />
                当前用户
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

ComponentNavbar.propTypes = {
  category: PropTypes.string.isRequired,
};
