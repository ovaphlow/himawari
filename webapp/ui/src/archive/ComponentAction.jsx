import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faCamera, faImages } from '@fortawesome/free-solid-svg-icons';

export default function ComponentAction({ archive_id, archive_uuid }) {
  return (
    <>
      <div className="btn-group">
        <a href={`#/${archive_id}/转出?uuid=${archive_uuid}`} className="btn btn-sm btn-light">
          <FontAwesomeIcon icon={faShare} fixedWidth />
          转出
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href={`picture.html#/扫描?archive_id=${archive_id}&archive_uuid=${archive_uuid}`} className="btn btn-sm btn-light">
          <FontAwesomeIcon icon={faCamera} fixedWidth />
          扫描
        </a>

        <a href={`picture.html#/?archive_id=${archive_id}&archive_uuid=${archive_uuid}`} className="btn btn-sm btn-light">
          <FontAwesomeIcon icon={faImages} fixedWidth />
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
