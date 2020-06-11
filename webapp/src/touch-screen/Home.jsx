import React, { useState } from 'react';

export default function Home() {
  const [id_card, setIdCard] = useState('');

  const handleAppend = (event) => {
    const c = event.target.getAttribute('data');
    setIdCard((prev) => `${prev}${c}`);
  };

  const handlePop = () => {
    setIdCard((prev) => prev.slice(0, prev.length - 1));
  };

  const handleSearch = async () => {
    const response = await window.fetch('/api/archive/search', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter: id_card }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = `#/${res.content.id}?uuid=${res.content.uuid}`;
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center">档案查询终端</h1>

      <hr />

      <div className="col-8 offset-2">
        <div className="card bg-dark shadow mt-5">
          <div className="card-header">
            <input
              type="text"
              value={id_card}
              className="form-control form-control-lg text-center"
              onChange={(event) => setIdCard(event.target.value)}
            />
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="1" onClick={handleAppend}>
                  1
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="2" onClick={handleAppend}>
                  2
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="3" onClick={handleAppend}>
                  3
                </button>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="4" onClick={handleAppend}>
                  4
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="5" onClick={handleAppend}>
                  5
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="6" onClick={handleAppend}>
                  6
                </button>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="7" onClick={handleAppend}>
                  7
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="8" onClick={handleAppend}>
                  8
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="9" onClick={handleAppend}>
                  9
                </button>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="?" onClick={handleAppend}>
                  <span className="text-warning">?</span>
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" data="0" onClick={handleAppend}>
                  0
                </button>
              </div>

              <div className="col">
                <button type="button" className="btn btn-outline-info btn-lg btn-block" onClick={handlePop}>
                  <span className="text-danger">
                    <i className="fa fa-fw fa-arrow-left" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button type="button" className="btn btn-block btn-lg btn-primary" onClick={handleSearch}>
              查询
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
