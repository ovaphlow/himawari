import React, { useEffect, useState, createRef } from 'react';
import { useLocation } from 'react-router-dom';
import { v5 as uuidv5 } from 'uuid';

export default function Capture() {
  const location = useLocation();
  const [archive_id, setArchiveId] = useState(0);
  const [archive_uuid, setArchiveUuid] = useState('');
  const [sn, setSn] = useState('');
  const [constraints] = useState({
    audio: true,
    video: { width: 800, height: 600 },
  });
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);
  const videoRef = createRef();

  const handleOpenDevice = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => window.console.error(err));
  };

  const handleCapture = () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, constraints.video.width, constraints.video.height);
    context.drawImage(document.getElementById('video'), 0, 0, constraints.video.width, constraints.video.height);

    const d = document.getElementById('canvas').toDataURL();
    const l = list;
    l.push({ id: index + 1, data: d });
    setList(l);
    setIndex(index + 1);
  };

  const handleRemove = (event) => {
    const t_id = parseInt(event.target.getAttribute('data-id'), 10);
    if (!t_id || t_id < 1) return;

    const li = list.slice();
    for (let i = 0; i < li.length; i += 1) {
      if (li[i].id === t_id) {
        li.splice(i, 1);
        setList(li);
        break;
      }
    }
  };

  const handleUpload = async () => {
    const loop = async (i) => {
      if (i === list.length) return;
      const response = await window.fetch('/api/picture/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          uuid: uuidv5(`picture-${new Date()}`, uuidv5.DNS),
          archive_id,
          doc: JSON.stringify({ base64: list[i].data }),
        }),
      });
      const res = await response.json();
      if (res.message) window.alert(`第 ${i + 1} 张图像上传失败: ${res.message}`);
      window.location = `#/?archive_id=${archive_id}&archive_uuid=${archive_uuid}`;
      loop(i + 1);
    };
    loop(0);
    setList([]);
    setIndex(0);
  };

  useEffect(() => {
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
    })();
  }, [archive_id, archive_uuid]);

  return (
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item">
                <a href={'archive.html#/'} className="text-light">
                  查询档案
                </a>
              </li>

              <li className="breadcrumb-item">
                <a href={`archive.html#/${archive_id}?uuid=${archive_uuid}`} className="text-light">
                  {sn}
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                <span className="text-muted">&gt;</span>
                扫描
                <span className="text-muted">&lt;</span>
              </li>
            </ol>
          </h1>
        </nav>

        <div className="clearfix p-2" />
      </div>

      <div className="m-3" />

      <div className="container-lg">
        <div className="alert alert-warning shadow">
          该功能目前使用base64编码存储图片内容，占用空间及带宽比较大。
          <br />
          在使用高拍仪厂商SDK时可以使用SDK自带的文件存储功能。
        </div>

        <div className="btn-group">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => { window.history.go(-1); }}>
            返回
          </button>
        </div>

        <div className="m-2" />

        <div className="card bg-dark shadow">
          <div className="card-body">
            <h3 className="text-muted">扫描档案图片</h3>
            <hr />

            <div className="text-center">
              <div className="btn-group">
                <button type="button" className="btn btn-info" onClick={handleOpenDevice}>
                  打开扫描仪
                </button>

                <button type="button" className="btn btn-primary" onClick={handleCapture}>
                  <i className="fa fa-fw fa-camera" />
                  扫描
                </button>

                <button type="button" className="btn btn-success" onClick={handleUpload}>
                  <i className="fa fa-fw fa-upload" />
                  上传
                </button>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col text-center">
                <video id="video" width={`${constraints.video.width}px`} height={`${constraints.video.height}px`} autoPlay="autoplay" ref={videoRef} />
              </div>
            </div>

            <div className="row" style={{ display: 'none' }}>
              <div className="col text-center">
                <canvas id="canvas" width={`${constraints.video.width}px`} height={`${constraints.video.height}px`} />
              </div>
            </div>

            <div className="row text-center">
              {list.map((it) => (
                <div className="card m-2" style={{ width: '18rem' }} key={it.id}>
                  <img src={it.data} alt={it.id} className="card-img-top" />

                  <div className="card-body text-center">
                    <button type="button" className="btn btn-sm btn-outline-danger" data-id={it.id} onClick={handleRemove}>
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
