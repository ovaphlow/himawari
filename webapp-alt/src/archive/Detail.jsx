import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v5 as uuidv5 } from 'uuid';

import ComponentToolbar from './ComponentToolbar';
import ComponentSideNav from './ComponentSideNav';
import ComponentVaultPicker from '../ComponentVaultPicker';

export default function Detail({ cat }) {
  const { id } = useParams();
  const location = useLocation();
  const [opt, setOpt] = useState('');
  const [sn, setSN] = useState('');
  const [sn_repeal, setSNRepeal] = useState('');
  const [id_card, setIdCard] = useState('');
  const [name, setName] = useState('');
  const [bday, setBday] = useState('');
  const [gender, setGender] = useState('');
  const [tel, setTel] = useState('');
  const [remark, setRemark] = useState('');
  const [vault_id, setVaultID] = useState('0');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (cat === '编辑') {
      const t_opt = new URLSearchParams(location.search).get('opt');
      if (t_opt === '中转区') {
        setOpt(t_opt);
        (async () => {
          const response = await fetch(`/api/archive/isolate/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
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
          setVaultID(doc.vault_id);
          setReason(doc.reason);
        })();
        return;
      }

      (async () => {
        const response = await window.fetch(`/api/archive/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
        const res = await response.json();
        window.console.info(res);
        setSN(res.content.sn);
        setSNRepeal(res.content.sn_alt);
        setIdCard(res.content.id_card);
        setName(res.content.name);
        const doc = JSON.parse(res.content.doc.value);
        setBday(doc.bday);
        setGender(doc.gender);
        setTel(doc.tel);
        setRemark(doc.remark);
        setVaultID(doc.vault_id);
        setReason(doc.reason);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      uuid: uuidv5(`${sn}-${id_card}`, uuidv5.DNS),
      sn,
      id_card,
      name,
      doc: JSON.stringify({
        bday,
        gender,
        tel,
        remark,
        vault_id,
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
      if (opt === '中转区') {
        const response = await fetch(`/api/archive/isolate/${id}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ reason, ...data }),
        });
        const res = await response.json();
        if (res.message) {
          window.alert(res.message);
          return;
        }
        window.location = '#/中转区';
        return;
      }
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
      window.location.reload(true);
    }
  };

  const handleSaveAndCapture = async () => {
    if (!sn || !id_card || !name) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (id_card.length !== 18) {
      window.alert('身份证长度错误');
      return;
    }

    const data = {
      sn,
      id_card,
      name,
      doc: {
        bday,
        gender,
        tel,
        remark,
        vault_id,
      },
    };

    let response = await fetch('/api/archive/check-valid', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    let res = await response.json();
    if (res.content.length > 0) {
      window.alert('档案号或身份证与现有档案冲突');
      return;
    }

    response = await window.fetch('/api/archive/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = `#档案/${res.content}/扫描`;
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    if (opt === '中转区') {
      const response = await fetch(`/api/archive/isolate/${id}`, {
        method: 'DELETE',
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.location = '#档案/中转区';
      return;
    }
    const response = await window.fetch(`/api/archive/${id}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  const handleTransferIn = async () => {
    if (!sn || !id_card || !name) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (!window.confirm('确定要将当前数据转入档案库？')) return;

    const data = {
      sn,
      id_card,
      name,
      doc: {
        bday,
        gender,
        tel,
        remark,
        vault_id,
      },
    };

    let response = await fetch('/api/archive/check-valid', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    let res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    if (res.content.length > 0) {
      window.alert('当前数据中的档案号或身份证与档案库中已有的档案相冲突');
      return;
    }
    response = await fetch('/api/archive/transfer-in', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = '#档案/中转区';
  };

  return (
    <div className="container">
      <h3>{`${cat} 档案`}</h3>
      <hr />

      <ComponentToolbar />

      {cat === '编辑' && (
        <ComponentSideNav archive_id={id} />
      )}

      <div className="card bg-dark shadow">
        <div className="card-body">
          <div className="row">
            <div className="form-group col-3">
              <label>档案号</label>
              <input
                type="text"
                value={sn || ''}
                className="form-control"
                onChange={(event) => setSN(event.target.value)}
              />
            </div>

            <div className="form-group col">
              <label>附加档案号</label>
              <input
                type="text"
                value={sn_repeal || ''}
                className="form-control"
                onChange={(event) => setSNRepeal(event.target.value)}
              />
            </div>

            <div className="col-3">
              <ComponentVaultPicker
                name="vault_id"
                value={vault_id}
                onChange={(event) => setVaultID(event.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col">
              <label>身份证</label>
              <input
                type="text"
                value={id_card || ''}
                className="form-control"
                onChange={(event) => setIdCard(event.target.value)}
                onBlur={handleIdCardBlur}
              />
            </div>

            <div className="form-group col">
              <label>姓名</label>
              <input
                type="text"
                value={name || ''}
                className="form-control"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-group col">
              <label>出生日期</label>
              <input
                type="text"
                value={bday || ''}
                className="form-control"
                onChange={(event) => setBday(event.target.value)}
              />
            </div>

            <div className="form-group col">
              <label>性别</label>
              <select
                className="form-control"
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
            <div className="form-group col-3">
              <label>联系电话</label>
              <input
                type="text"
                value={tel || ''}
                className="form-control"
                onChange={(event) => setTel(event.target.value)}
              />
            </div>

            <div className="form-group col">
              <label>备注</label>
              <input
                type="text"
                value={remark || ''}
                className="form-control"
                onChange={(event) => setRemark(event.target.value)}
              />
            </div>
          </div>

          {opt === '中转区' && (
            <div className="form-group">
              <label>转出原因</label>
              <input
                type="text"
                value={reason || ''}
                className="form-control"
                onChange={(event) => setReason(event.target.value)}
              />
            </div>
          )}
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
            {cat === '转入' && (
              <button type="button" className="btn btn-success" onClick={handleSaveAndCapture}>
                <i className="fa fa-fw fa-camera" />
                保存并扫描档案
              </button>
            )}

            {cat === '编辑' && (
              <button type="button" className="btn btn-danger" onClick={handleRemove}>
                <i className="fa fa-fw fa-trash-o" />
                删除
              </button>
            )}

            {cat === '编辑' && opt === '中转区' && (
              <button
                type="button"
                className="btn btn-info"
                onClick={handleTransferIn}
              >
                <i className="fa fa-fw fa-download" />
                转入档案库
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
  );
}

Detail.propTypes = {
  cat: PropTypes.string.isRequired,
};
