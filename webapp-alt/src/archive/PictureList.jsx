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
      const response = await window.fetch(`/api/archive/${id}?uuid=${new URLSearchParams(location.search).get('uuid')}`);
      const res = await response.json();
      setSn(res.content.sn);
      setName(res.content.name);
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
                <a href={`#/${it.master_id}/图像/${it.id}`}>
                  <img src={it.content} alt={it.id} className="img-fluid rounded" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
