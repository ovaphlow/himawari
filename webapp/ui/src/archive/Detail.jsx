import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v5 as uuidv5 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArchive, faCheck } from '@fortawesome/free-solid-svg-icons';

import ComponentAction from './ComponentAction';
import ComponentVaultPicker from '../ComponentVaultPicker';
import useAuth from '../useAuth';

export default function Detail({ cat }) {
  const { id } = useParams();
  const location = useLocation();
  const [sn, setSN] = useState('');
  const [sn_repeal, setSNRepeal] = useState('');
  const [id_card, setIdCard] = useState('');
  const [name, setName] = useState('');
  const [bday, setBday] = useState('');
  const [gender, setGender] = useState('');
  const [tel, setTel] = useState('');
  const [remark, setRemark] = useState('');
  const [vault_id, setVaultID] = useState(0);
  const auth = useAuth();

  useEffect(() => {
    if (cat === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/archive/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
        const res = await response.json();
        setSN(res.content.sn);
        setSNRepeal(JSON.parse(res.content.sn_repeal.value).join(','));
        setIdCard(res.content.id_card);
        setName(res.content.name);
        const doc = JSON.parse(res.content.doc.value);
        setBday(doc.bday);
        setGender(doc.gender);
        setTel(doc.tel);
        setRemark(doc.remark);
        setVaultID(parseInt(doc.vault_id, 10));
      })();
    }
    // eslint-disable-next-line
  }, []);

  const handleIdCardBlur = () => {
    const b = `${id_card.slice(6, 10)}-${id_card.slice(10, 12)}-${id_card.slice(12, 14)}`;
    setBday(b);
  };

  const handleSave = async () => {
    if (!sn || !id_card || !name) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (id_card.length !== 18) {
      window.alert('身份证长度错误');
      return;
    }

    const data = {
      uuid: uuidv5(`${id_card}`, uuidv5.DNS),
      id_card,
      name,
      doc: JSON.stringify({
        bday,
        gender,
        tel,
        remark,
        vault_id: parseInt(vault_id, 10),
      }),
    };

    if (cat === '转入') {
      let res = await fetch('/api/archive/check-valid', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      res = await res.json();
      if (res.content.length > 0) {
        window.alert('档案号或身份证与现有档案冲突');
        return;
      }

      res = await window.fetch('/api/archive/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      res = await res.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (cat === '编辑') {
      let response = await window.fetch('/api/archive/check-valid-with-id', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });
      let res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      if (res.content.length > 0) {
        window.alert('档案号或身份证与现有档案冲突');
        return;
      }

      response = await window.fetch(`/api/archive/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;

    if (!auth.auth_super) {
      window.alert('当前用户没有对应权限');
      return;
    }

    const response = await window.fetch(`/api/archive/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
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
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-end">
          <h1>档案信息</h1>
        </div>

        <hr />

        <div className="d-flex justify-content-center">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="home.html" className="text-reset text-decoration-none">
                  <FontAwesomeIcon icon={faHome} fixedWidth />
                  首页
                </a>
              </li>

              <li className="breadcrumb-item">
                <a href="archive.html" className="text-reset text-decoration-none">
                  <FontAwesomeIcon icon={faArchive} fixedWidth />
                  档案管理
                </a>
              </li>

              <li className="breadcrumb-item active">
                <strong>
                  {(id && sn) || '转入'}
                </strong>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="m-3" />

      <div className="container-lg">
        {id && (
          <ComponentAction archive_id={id} archive_uuid={new URLSearchParams(location.search).get('uuid')} />
        )}

        <div className="m-2" />

        <div className="card bg-dark shadow">
          <div className="card-header" />

          <div className="card-body">
            <div className="row">
              <div className="col-3 mb-3">
                <label className="form-label">档案号</label>
                <input
                  type="text"
                  value={sn}
                  className="form-control input-underscore"
                  onChange={(event) => setSN(event.target.value)}
                />
              </div>

              <div className="col mb-3">
                <label className="form-label">附加档案号</label>
                <input
                  type="text"
                  value={sn_repeal}
                  className="form-control input-underscore"
                  onChange={(event) => setSNRepeal(event.target.value)}
                />
              </div>

              <div className="col-3">
                <ComponentVaultPicker
                  name="vault_id"
                  value={vault_id}
                  onChange={(event) => setVaultID(parseInt(event.target.value, 10))}
                />
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <label className="form-label">身份证</label>
                <input
                  type="text"
                  value={id_card || ''}
                  className="form-control input-underscore"
                  onChange={(event) => setIdCard(event.target.value)}
                  onBlur={handleIdCardBlur}
                />
              </div>

              <div className="mb-3 col">
                <label className="form-label">姓名</label>
                <input
                  type="text"
                  value={name || ''}
                  className="form-control input-underscore"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="mb-3 col">
                <label className="form-label">出生日期</label>
                <input
                  type="text"
                  value={bday || ''}
                  className="form-control input-underscore"
                  onChange={(event) => setBday(event.target.value)}
                />
              </div>

              <div className="mb-3 col">
                <label className="form-label">性别</label>
                <select
                  className="form-control input-underscore"
                  value={gender || ''}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option value="">未选择</option>
                  <option value="女">女</option>
                  <option value="男">男</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-3">
                <label className="form-label">联系电话</label>
                <input
                  type="text"
                  value={tel || ''}
                  className="form-control input-underscore"
                  onChange={(event) => setTel(event.target.value)}
                />
              </div>

              <div className="mb-3 col">
                <label className="form-label">备注</label>
                <input
                  type="text"
                  value={remark || ''}
                  className="form-control input-underscore"
                  onChange={(event) => setRemark(event.target.value)}
                />
              </div>
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
              <button type="button" className="btn btn-outline-danger" onClick={handleRemove}>
                删除
              </button>
              )}

              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <FontAwesomeIcon icon={faCheck} fixedWidth />
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Detail.propTypes = {
  cat: PropTypes.string.isRequired,
};
