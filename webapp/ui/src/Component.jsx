import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faArchive, faBox, faHandPointUp, faHistory, faUserCircle, faSignOutAlt, faCogs, faPlus,
} from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line import/prefer-default-export
export function TopNav() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container is-fluid">
        <div className="navbar-brand">
          <a href="home.html" className="navbar-item">
            OVAPHLOW
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {/* <a href="archive.html" className="navbar-item">
              <FontAwesomeIcon icon={faArchive} fixedWidth />
              档案管理
            </a> */}

            {/* <a href="archive-isolated.html" className="navbar-item">
              <FontAwesomeIcon icon={faBox} fixedWidth />
              档案中转库
            </a> */}

            {/* <a href="touch-screen.html" className="navbar-item">
              <FontAwesomeIcon icon={faHandPointUp} fixedWidth />
              触摸屏查询终端
            </a> */}

            {/* <a href="api-journal.html" className="navbar-item">
              <FontAwesomeIcon icon={faHistory} fixedWidth />
              API 调用记录
            </a> */}
          </div>

          <div className="navbar-end">
            <a href="home.html" className="navbar-item">
              <FontAwesomeIcon icon={faHome} fixedWidth />
            </a>

            <a href="setting.html" className="navbar-link">
              <FontAwesomeIcon icon={faCogs} fixedWidth />
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a href="current-user.html" className="navbar-link">
                <FontAwesomeIcon icon={faUserCircle} fixedWidth />
              </a>

              <div className="navbar-dropdown">
                <a href="current-user.html" className="navbar-item">
                  <FontAwesomeIcon icon={faUserCircle} fixedWidth />
                  用户信息
                </a>

                <hr className="navbar-divider" />

                <a href="sign-in.html" className="navbar-item">
                  <FontAwesomeIcon icon={faSignOutAlt} fixedWidth />
                  退出登录
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function LeftNav() {
  return (
    <div className="box">
      <aside className="menu" style={{ width: '240px' }}>
        <p className="menu-label">档案功能</p>
        <ul className="menu-list">
          <li>
            <a href="archive.html#/录入">
              <FontAwesomeIcon icon={faPlus} fixedWidth />
              录入档案
            </a>
          </li>

          <li>
            <a href="archive.html">
              <FontAwesomeIcon icon={faArchive} fixedWidth />
              档案管理
            </a>
          </li>

          <li>
            <a href="archive.html">
              <FontAwesomeIcon icon={faBox} fixedWidth />
              档案中转库
            </a>
          </li>
        </ul>
        <p className="menu-label">设备</p>
        <ul className="menu-list">
          <li>
            <a href="archive.html">
              <FontAwesomeIcon icon={faHandPointUp} fixedWidth />
              触摸屏查询终端
            </a>
          </li>
        </ul>
        <p className="menu-label">其它</p>
        <ul className="menu-list">
          <li>
            <a href="archive.html">
              <FontAwesomeIcon icon={faHistory} fixedWidth />
              API 调用记录
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Bulma</strong>
          {' '}
          by
          <a href="https://jgthms.com">Jeremy Thomas</a>
          . The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
          . The website content
          is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>
          .
        </p>
      </div>
    </footer>
  );
}
