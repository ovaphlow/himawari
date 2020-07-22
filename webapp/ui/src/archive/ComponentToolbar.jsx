import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function ComponentToolbar() {
  return (
    <div className="btn-group mb-2">
      <a href="#/转入" className="btn btn-sm btn-success">
        <FontAwesomeIcon icon={faPlus} fixedWidth />
        转入档案
      </a>

      <a href="#/导入" className="btn btn-sm btn-warning">
        <FontAwesomeIcon icon={faUpload} fixedWidth />
        导入档案
      </a>

      <a href="#/" className="btn btn-sm btn-info">
        <FontAwesomeIcon icon={faSearch} fixedWidth />
        查询档案
      </a>
    </div>
  );
}
