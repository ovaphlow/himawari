import React, { useEffect, useState, createRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { v5 as uuidv5 } from 'uuid';

export default function Capture() {
  const { id } = useParams();
  const location = useLocation();
  const [sn, setSn] = useState('');
  const [name, setName] = useState('');
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
    window.console.info(l);
  };

  const handleRemove = (event) => {
    const t_id = parseInt(event.target.getAttribute('data-id'), 10);
    if (!t_id || t_id < 1) return;

    // 删除对应图像数据
    // ???
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
          archive_id: id,
          doc: JSON.stringify({ base64: list[i].data }),
        }),
      });
      const res = await response.json();
      if (res.message) window.alert(`第 ${i + 1} 张图像上传失败: ${res.message}`);
      window.location = `#/${id}/图像?uuid=${new URLSearchParams(location.search).get('uuid')}`;
      loop(i + 1);
    };
    loop(0);
    setList([]);
    setIndex(0);
  };

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
            扫描档案图片
          </li>
        </ol>
      </nav>

      <div className="alert alert-warning shadow">
        该功能目前使用base64编码存储图片内容，占用空间及带宽比较大。
        <br />
        在使用高拍仪厂商SDK时可以使用SDK自带的文件存储功能。
        <br />
        Windows系统中使用Edge浏览器调用摄像头测试。
      </div>

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
  );
}
