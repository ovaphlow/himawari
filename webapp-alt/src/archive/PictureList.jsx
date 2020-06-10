import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function PictureList() {
  const { id } = useParams();
  const location = useLocation();
  const [sn, setSn] = useState();
  const [name, setName] = useState();
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const uuid = new URLSearchParams(location.search).get('uuid');
      let response = await window.fetch(`/api/archive/${id}?uuid=${uuid}`);
      let res = await response.json();
      setSn(res.content.sn);
      setName(res.content.name);

      response = await window.fetch('/api/picture/', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ archive_id: parseInt(id, 10) }),
      });
      res = await response.json();

      const loop = async (index, plist) => {
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
        window.console.info(plist);
        setList(plist);
        loop(index + 1, plist);
      };
      loop(0, []);
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
            <a href={`#/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`}>
              {sn}
              {' '}
              {name}
            </a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            图像
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-body">
          <div className="row row-cols-3">
            {list.map((it) => (
              <div className="col pb-3" key={it.id}>
                <a href={`#/${it.archive_id}/图像/${it.id}?uuid=${it.uuid}&archive_uuid=${new URLSearchParams(location.search).get('uuid')}`}>
                  <img src={it.base64} alt={it.uuid} className="img-fluid rounded" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
