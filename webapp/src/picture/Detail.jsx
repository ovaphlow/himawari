import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUuid] = useState('');
  const [archive_id, setArchiveId] = useState(0);
  const [archive_uuid, setArchiveUuid] = useState('');
  const [sn, setSn] = useState('');
  const [name, setName] = useState('');
  const [base64, setBase64] = useState('');
  const [prev_id, setPrevId] = useState(0);
  const [next_id, setNextId] = useState(0);

  const handlePrevious = () => {
    window.location = `#/${prev_id}?uuid=${uuid}&archive_id=${archive_id}&archive_uuid=${archive_uuid}`;
    window.location.reload(true);
  };

  const handleNext = () => {
    window.location = `#/${next_id}?uuid=${uuid}&archive_id=${archive_id}&archive_uuid=${archive_uuid}`;
    window.location.reload(true);
  };

  useEffect(() => {
    setUuid(new URLSearchParams(location.search).get('uuid'));
    setArchiveId(parseInt(new URLSearchParams(location.search).get('archive_id'), 10));
    setArchiveUuid(new URLSearchParams(location.search).get('archive_uuid'));
  }, []);

  useEffect(() => {
    if (archive_id === 0) return;
    if (archive_uuid === '') return;
    (async () => {
      const response = await window.fetch(`/api/archive/${archive_id}?uuid=${archive_uuid}`);
      const res = await response.json();
      setSn(res.content.sn);
      setName(res.content.name);
    })();
  }, [archive_id, archive_uuid]);

  useEffect(() => {
    if (!uuid) return;
    if (archive_id === 0) return;
    (async () => {
      const response = await window.fetch(`/api/picture/${id}?uuid=${uuid}&archive_id=${archive_id}`);
      const res = await response.json();
      setBase64(JSON.parse(res.content.doc.value).base64);
      setPrevId(res.content.prev_id || 0);
      setNextId(res.content.next_id || 0);
    })();
  }, [uuid, archive_id]);

  return (
    <div className="container">
      <h1>档案图像</h1>

      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-dark">
          <li className="breadcrumb-item">
            <a href="archive.html#/">档案</a>
          </li>

          <li className="breadcrumb-item">
            <a href={`archive.html#/${archive_id}?archive_uuid=${archive_uuid}`}>
              {sn}
              {' '}
              {name}
            </a>
          </li>

          <li className="breadcrumb-item">
            <a href={`#/?archive_id=${archive_id}&archive_uuid=${archive_uuid}`}>
              图像
            </a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {uuid}
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-header">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => { window.location = `#/?archive_id=${archive_id}&uuid=${archive_uuid}`; }}
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
