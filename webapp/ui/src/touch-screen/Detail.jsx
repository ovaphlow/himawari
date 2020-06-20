import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const [sn, setSn] = useState('');
  const [id_card, setIdCard] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [bday, setBday] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    const uuid = new URLSearchParams(location.search).get('uuid');
    (async () => {
      const response = await window.fetch(`/api/archive/${id}?uuid=${uuid}`);
      const res = await response.json();
      setSn(res.content.sn);
      setIdCard(res.content.id_card);
      setName(res.content.name);
      const doc = JSON.parse(res.content.doc.value);
      setGender(doc.gender);
      setBday(doc.bday);
      setTel(doc.tel);
    })();
  }, []);

  return (
    <div className="container-lg">
      <h1 className="mt-5 text-center">档案查询终端</h1>

      <hr />

      <div className="col-8 offset-2">
        <div className="card bg-dark shadow mt-5">
          <div className="card-body">
            <dl className="row lead">
              <dt className="col-3">档案号</dt>
              <dd className="col-9">{sn}</dd>

              <dt className="col-3">身份证</dt>
              <dd className="col-9">{id_card}</dd>

              <dt className="col-3">姓名</dt>
              <dd className="col-9">{name}</dd>

              <dt className="col-3">性别</dt>
              <dd className="col-9">{gender}</dd>

              <dt className="col-3">出生日期</dt>
              <dd className="col-9">{bday}</dd>

              <dt className="col-3">联系电话</dt>
              <dd className="col-9">{tel}</dd>
            </dl>
          </div>

          <div className="card-footer">
            <button
              type="button"
              className="btn btn-block btn-lg btn-info"
              onClick={() => { window.location = `#/${id}/图像`; }}
            >
              查看档案
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
