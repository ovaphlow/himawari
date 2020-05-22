import React, { useEffect, useState, createRef } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from './component/Sidebar';
import Toolbar from './component/Toolbar';

/**
 * Windows 10系统下使用Edge测试
 * Chrome, Firefox 可能没有权限
 * @param {*} props
 */
export default function Capture() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [list, setList] = useState([]);
  const [constraints] = useState({
    audio: true,
    video: { width: 1280, height: 720 },
  });
  const [index, setIndex] = useState(0);
  const videoRef = createRef();

  useEffect(() => {
    fetch(`/api/archive/${id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          window.alert(res.message);
          return;
        }
        setItem(res.content);
      })
      .catch((err) => window.console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDevice = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => { videoRef.current.srcObject = stream; })
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
    // for (let i = 0; i < list.length; i += 1) {
    //   const response = await window.fetch(`/api/archive/${item.id}/base64`, {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //     body: JSON.stringify({ content: list[i].data }),
    //   });
    //   const res = await response.json();
    //   if (res.message) window.alert(`第 ${i + 1} 张图像上传失败: ${res.message}`);
    //   window.location = `#档案/${item.id}/图片`;
    // }
    const loop = async (i) => {
      const response = await window.fetch(`/api/archive/${item.id}/base64`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ content: list[i].data }),
      });
      const res = await response.json();
      if (res.message) window.alert(`第 ${i + 1} 张图像上传失败: ${res.message}`);
      window.location = `#档案/${item.id}/图片`;
      loop(i + 1);
    };
    loop(0);
  };

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">扫描档案图片</h3>
        <hr />

        <div className="alert alert-warning shadow">
          该功能目前使用base64编码存储图片内容，占用空间及带宽比较大。
          <br />
          在使用高拍仪厂商SDK时可以使用SDK自带的文件存储功能。
          <br />
          Windows系统中使用Edge浏览器调用摄像头测试。
        </div>

        <Toolbar id={item.id} />

        <div className="card shadow">
          <div className="card-header">
            <span className="lead">
              {item.sn}
              ：
              {item.name}
              （
              {item.identity}
              ）
            </span>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col text-center">
                <video id="video" width={`${constraints.video.width}px`} height={`${constraints.video.height}px`} autoPlay="autoplay" ref={videoRef} />
              </div>
            </div>

            <hr />

            <div className="row mt-1 mb-3">
              <div className="col text-center">
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
            </div>

            <div className="row" style={{ display: 'none' }}>
              <div className="col text-center">
                <canvas id="canvas" width={`${constraints.video.width}px`} height={`${constraints.video.height}px`} />
              </div>
            </div>

            <div className="row text-center">
              {
                list.map((it) => (
                  <div className="card m-2" style={{ width: '18rem' }} key={it.id}>
                    <img src={it.data} alt={it.id} className="card-img-top" />

                    <div className="card-body text-center">
                      <button type="button" className="btn btn-sm btn-outline-danger" data-id={it.id} onClick={handleRemove}>
                        删除
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
