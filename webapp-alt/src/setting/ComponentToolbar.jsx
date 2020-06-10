import React from 'react';

export default function ComponentToolbar() {
  return (
    <div className="btn-group">
      <a href="#/档案库" className="btn btn-outline-info">
        <i className="fa fa-fw fa-map-marker" />
        档案库
      </a>

      <a href="#/部门" className="btn btn-outline-info">
        <i className="fa fa-fw fa-sitemap" />
        部门
      </a>

      <a href="#/用户" className="btn btn-outline-info">
        <i className="fa fa-fw fa-users" />
        用户
      </a>
    </div>
  );
}
