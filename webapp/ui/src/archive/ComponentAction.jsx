import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentAction({ archive_id, archive_uuid }) {
  return (
    <>
      <div className="btn-group">
        <a href={`#/${archive_id}/转出?uuid=${archive_uuid}`} className="btn btn-sm btn-light">
          <i className="fa fa-fw fa-mail-forward" />
          转出
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href={`picture.html#/扫描?archive_id=${archive_id}&archive_uuid=${archive_uuid}`} className="btn btn-sm btn-light">
          <i className="fa fa-fw fa-camera" />
          扫描
        </a>

        <a href={`picture.html#/?archive_id=${archive_id}&archive_uuid=${archive_uuid}`} className="btn btn-sm btn-light">
          <i className="fa fa-fw fa-image" />
          查看档案图像
        </a>
      </div>
    </>
  );
}

ComponentAction.propTypes = {
  archive_id: PropTypes.string.isRequired,
  archive_uuid: PropTypes.string.isRequired,
};
