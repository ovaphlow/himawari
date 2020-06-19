import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v5 as uuidv5 } from 'uuid';

export default function Detail({ cat }) {
  const { id } = useParams();
  const location = useLocation();
  const [sn_repeal, setSnRepeal] = useState('');
  const [id_card, setIdCard] = useState('');
  const [name, setName] = useState('');
  const [bday, setBday] = useState('');
  const [gender, setGender] = useState('');
  const [tel, setTel] = useState('');
  const [remark, setRemark] = useState('');
  const [reason, setReason] = useState('');

  const handleIdCardBlur = () => {
    const b = `${id_card.slice(6, 10)}-${id_card.slice(10, 12)}-${id_card.slice(12, 14)}`;
    setBday(b);
  };

  const handleSave = async () => {
    if (!id_card || !name) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (id_card.length !== 18) {
      window.alert('身份证长度错误');
      return;
    }

    const data = {
      uuid: uuidv5(`${id_card}`, uuidv5.DNS),
      sn_repeal: sn_repeal || '[]',
      id_card,
      name,
      doc: JSON.stringify({
        bday,
        gender,
        tel,
        remark,
        reason,
      }),
    };

    if (cat === '新增') {
      const response = await fetch('/api/archive-isolated/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.location = '#/';
    } else if (cat === '编辑') {
      const response = await fetch(`/api/archive-isolated/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.location = '#/';
    }
  };

  const handleTransferIn = async () => {
    if (!id_card || !name) {
      window.alert('请完整填写所需信息');
      return;
    }
    if (!window.confirm('确定要将当前数据转入档案库？')) return;

    const data = {
      sn_repeal,
      id_card,
      name,
      doc: {
        bday,
        gender,
        tel,
        remark,
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
    response = await fetch('/api/archive/transfer-in/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = '#/';
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await fetch(`/api/archive-isolated/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = '#/';
  };

  useEffect(() => {
    if (cat === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/archive-isolated/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
        const res = await response.json();
        setSnRepeal(JSON.parse(res.content.sn_repeal.value).join(','));
        setIdCard(res.content.id_card);
        setName(res.content.name);
        const doc = JSON.parse(res.content.doc.value);
        setBday(doc.bday);
        setGender(doc.gender);
        setTel(doc.tel);
        setRemark(doc.remark);
        setReason(doc.reason);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-lg">
      <h1>档案中转库</h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item">
            <a href="#/">档案中转库</a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {cat}
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-body">
          <div className="form-group">
            <label>附加档案号</label>
            <input
              type="text"
              value={sn_repeal || ''}
              className="form-control"
              onChange={(event) => setSnRepeal(event.target.value)}
            />
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

          <div className="form-group">
            <label>转出原因</label>
            <input
              type="text"
              value={reason || ''}
              className="form-control"
              onChange={(event) => setReason(event.target.value)}
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
              <button type="button" className="btn btn-danger" onClick={handleRemove}>
                <i className="fa fa-fw fa-trash-o" />
                删除
              </button>
            )}

            {cat === '编辑' && (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => { window.location = `#/${id}/转入?uuid=${new URLSearchParams(location.search).get('uuid')}`; }}
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
