import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function Picture() {
  const { archive_id, id } = useParams();
  const location = useLocation();
  const [uuid, setUuid] = useState('');
  const [archive_uuid, setArchiveUuid] = useState('');
  const [sn, setSn] = useState('');
  const [name, setName] = useState('');
  const [base64, setBase64] = useState('');
  const [prev_id, setPrevId] = useState(0);
  const [next_id, setNextId] = useState(0);

  const handlePrevious = () => {
    window.location = `#/${archive_id}/图像/${prev_id}?uuid=${uuid}&archive_uuid=${archive_uuid}`;
    window.location.reload(true);
  };

  const handleNext = () => {
    window.location = `#/${archive_id}/图像/${next_id}?uuid=${uuid}&archive_uuid=${archive_uuid}`;
    window.location.reload(true);
  };

  useEffect(() => {
    const t_archive_uuid = new URLSearchParams(location.search).get('archive_uuid');
    setArchiveUuid(t_archive_uuid);
    const t_uuid = new URLSearchParams(location.search).get('uuid');
    setUuid(t_uuid);
    (async () => {
      let response = await window.fetch(`/api/archive/${archive_id}?uuid=${t_archive_uuid}`);
      let res = await response.json();
      setSn(res.content.sn);
      setName(res.content.name);

      response = await window.fetch(`/api/picture/${id}?uuid=${t_uuid}&archive_id=${archive_id}`);
      res = await response.json();
      setBase64(JSON.parse(res.content.doc.value).base64);
      setPrevId(res.content.prev_id || 0);
      setNextId(res.content.next_id || 0);
    })();
  }, []);

  return (
    <div className="container">
      <h1>档案</h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item">
            <a href="#/">档案</a>
          </li>

          <li className="breadcrumb-item">
            <a href={`#/${archive_id}?uuid=${new URLSearchParams(location.search).get('archive_uuid')}`}>
              {sn}
              {' '}
              {name}
            </a>
          </li>

          <li className="breadcrumb-item">
            <a href={`#/${archive_id}/图像?uuid=${new URLSearchParams(location.search).get('archive_uuid')}`}>
              图像
            </a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {new URLSearchParams(location.search).get('uuid')}
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-header">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => { window.location = `#/${archive_id}/图像?uuid=${archive_uuid}`; }}
            >
              返回
            </button>
          </div>

          <div className="btn-group pull-right">
            {prev_id > 0 && (
            <button
              type="button"
              className="btn btn-sm btn-outline-info"
              onClick={handlePrevious}
            >
              <i className="fa fa-fw fa-arrow-left" />
              上一张
            </button>
            )}
            {next_id > 0 && (
            <button
              type="button"
              className="btn btn-sm btn-outline-info"
              onClick={handleNext}
            >
              <i className="fa fa-fw fa-arrow-right" />
              下一张
            </button>
            )}
          </div>
        </div>

        <div className="card-body">
          <img src={base64} alt={uuid} className="img-fluid rounded mx-auto d-block" />
        </div>
      </div>
    </div>
  );
}
