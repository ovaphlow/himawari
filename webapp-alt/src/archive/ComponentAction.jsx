import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentAction({ archive_id, archive_uuid }) {
  return (
    <div className="btn-group">
      <a href={`#/${archive_id}/转出?uuid=${archive_uuid}`} className="btn btn-sm btn-outline-info">
        <i className="fa fa-fw fa-mail-forward" />
        转出
      </a>

      <a href={`#/${archive_id}/扫描?uuid=${archive_uuid}`} className="btn btn-sm btn-outline-info">
        <i className="fa fa-fw fa-camera" />
        扫描
      </a>

      <a href={`#/${archive_id}/图像?uuid=${archive_uuid}`} className="btn btn-sm btn-outline-info">
        <i className="fa fa-fw fa-image" />
        查看档案图像
      </a>

      <a href={`#/${archive_id}?uuid=${archive_uuid}`} className="btn btn-sm btn-outline-info">
        <i className="fa fa-fw fa-archive" />
        档案信息
      </a>
    </div>
  );
}

ComponentAction.propTypes = {
  archive_id: PropTypes.string.isRequired,
  archive_uuid: PropTypes.string.isRequired,
};
