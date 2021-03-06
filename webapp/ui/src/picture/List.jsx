import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function List() {
  const location = useLocation();
  const [archive_id, setArchiveId] = useState(0);
  const [archive_uuid, setArchiveUuid] = useState('');
  const [sn, setSn] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    setArchiveId(parseInt(new URLSearchParams(location.search).get('archive_id'), 10));
    setArchiveUuid(new URLSearchParams(location.search).get('archive_uuid'));
  }, []);

  useEffect(() => {
    if (archive_id === 0) return;
    (async () => {
      const response = await window.fetch('/api/picture/', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ archive_id }),
      });
      const res = await response.json();
      const plist = [];

      const loop = async (index) => {
        if (index === res.content.length) return;
        const it = res.content[index];
        let resp = await window.fetch(`/api/picture/${it.id}?uuid=${it.uuid}&archive_id=${it.archive_id}`);
        resp = await resp.json();
        plist.push({
          id: resp.content.id,
          uuid: resp.content.uuid,
          archive_id: resp.content.archive_id,
          base64: JSON.parse(resp.content.doc.value).base64,
        });
        setList(plist.slice());
        loop(index + 1);
      };
      loop(0);
    })();
  }, [archive_id]);

  useEffect(() => {
    if (archive_id === 0) return;
    if (archive_uuid === '') return;
    (async () => {
      const response = await window.fetch(`/api/archive/${archive_id}?uuid=${archive_uuid}`);
      const res = await response.json();
      setSn(res.content.sn);
    })();
  }, [archive_id, archive_uuid]);

  return (
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href="archive.html#/" className="text-reset text-decoration-none">
                  查询档案
                </a>
              </li>

              <li className="breadcrumb-item">
                <a href={`archive.html#/${archive_id}?uuid=${archive_uuid}`} className="text-reset text-decoration-none">
                  {sn}
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                <span className="text-muted">&gt;</span>
                <strong>档案图像</strong>
                <span className="text-muted">&lt;</span>
              </li>
            </ol>
          </h1>
        </nav>

        <div className="clearfix p-2" />
      </div>

      <div className="m-3" />

      <div className="container-lg">
        <div className="card bg-dark shadow">
          <div className="card-body">
            <div className="row row-cols-3">
              {list.map((it) => (
                <div className="col pb-3" key={it.id}>
                  <a href={`#/${it.id}?uuid=${it.uuid}&archive_id=${archive_id}&archive_uuid=${archive_uuid}`}>
                    <img src={it.base64} alt={it.uuid} className="img-fluid rounded" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
