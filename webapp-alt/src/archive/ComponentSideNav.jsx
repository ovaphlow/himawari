import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentSideNav({ archive_id }) {
  return (
    <div className="list-group pull-right ml-3 mt-1">
      <a href={`#/${archive_id}/转出`} className="list-group-item list-group-item-action">
        <i className="fa fa-fw fa-mail-forward" />
        转出
      </a>

      <a href={`#/${archive_id}/扫描`} className="list-group-item list-group-item-action">
        <i className="fa fa-fw fa-camera" />
        扫描
      </a>

      <a href={`#/${archive_id}/图像`} className="list-group-item list-group-item-action">
        <i className="fa fa-fw fa-image" />
        查看档案图像
      </a>

      <a href={`#/${archive_id}`} className="list-group-item list-group-item-action">
        <i className="fa fa-fw fa-archive" />
        档案信息
      </a>
    </div>
  );
}

ComponentSideNav.propTypes = {
  archive_id: PropTypes.string.isRequired,
};
