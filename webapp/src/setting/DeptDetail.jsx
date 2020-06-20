import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v5 as uuidv5 } from 'uuid';

import ComponentToolbar from './ComponentToolbar';

export default function DeptDetail({ cat }) {
  const { id } = useParams();
  const location = useLocation();
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    if (cat === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/setting/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
        const res = await response.json();
        setName(res.content.name);
        setAddr(JSON.parse(res.content.doc.value).addr);
        setTel(JSON.parse(res.content.doc.value).tel);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!name || !tel || !addr) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      uuid: uuidv5(`部门-${name}`, uuidv5.DNS),
      master_id: 0,
      category: '部门',
      name,
      value: '',
      doc: JSON.stringify({ addr, tel }),
    };

    if (cat === '新增') {
      const response = await window.fetch('/api/setting/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (cat === '编辑') {
      const response = await window.fetch(`/api/setting/${id}?uuid=${data.uuid}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/setting/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  return (
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">
                <a href="#/部门" className="text-light">
                  部门
                </a>
              </li>
              <li className="breadcrumb-item active">
                <span className="text-muted">&gt;</span>
                <strong>
                  {cat}
                </strong>
                <span className="text-muted">&lt;</span>
              </li>
            </ol>
          </h1>
        </nav>

        <hr />

        <div className="text-center">
          <ComponentToolbar />
        </div>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <div className="mb-3">
                  <label className="form-label">名称</label>
                  <input
                    type="text"
                    value={name || ''}
                    className="form-control"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-4 offset-4">
                <div className="mb-3">
                  <label className="form-label">电话</label>
                  <input
                    type="tel"
                    value={tel}
                    className="form-control"
                    onChange={(event) => setTel(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">位置</label>
              <input
                type="text"
                value={addr || ''}
                className="form-control"
                onChange={(event) => setAddr(event.target.value)}
              />
            </div>
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => window.history.go(-1)}
              >
                返回
              </button>
            </div>

            <div className="btn-group pull-right">
              {cat === '编辑' && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleRemove}
              >
                <i className="fa fa-fw fa-trash-o" />
                删除
              </button>
              )}

              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <i className="fa fa-fw fa-save" />
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DeptDetail.propTypes = {
  cat: PropTypes.string.isRequired,
};
