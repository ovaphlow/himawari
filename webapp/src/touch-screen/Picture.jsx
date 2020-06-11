import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Picture() {
  const [countdown, setCountdown] = useState(30);
  const [interval_id, setIntervalId] = useState(0);
  const { id } = useParams();
  const [list, setList] = useState([]);

  const handleResetCountdown = () => {
    setCountdown(30);
  };

  const handleBackward = () => {
    window.removeEventListener('mousemove', handleResetCountdown, false);
    window.clearInterval(interval_id);
    window.history.go(-1);
  };

  useEffect(() => {
    const loop = () => {
      setCountdown((prev) => prev - 1);
    };

    setIntervalId(window.setInterval(loop, 1000));

    // 需要替换为触摸屏事件
    window.addEventListener('mousemove', handleResetCountdown, false);

    return () => {
      window.clearInterval(interval_id);
      // 需要替换为触摸屏事件
      window.removeEventListener('mousemove', handleResetCountdown, false);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      window.clearInterval(interval_id);
      window.location = '#/';
    }
  }, [countdown]);

  return (
    <div className="container">
      <h1 className="mt-5 text-center">
        <span className="pull-left">
          {countdown}
        </span>
        档案查询终端
        <span className="pull-right">
          <button type="button" className="btn btn-lg btn-outline-success" onClick={handleBackward}>
            返回
          </button>
        </span>
      </h1>

      <hr />
    </div>
  );
}
