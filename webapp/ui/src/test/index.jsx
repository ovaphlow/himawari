import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Index />, document.getElementById('app'));

function Index() {
  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <nav className="navbar navbar-expand navbar-dark fixed-top sticky-top bg-dark mb-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="#/">Fixed navbar</a>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <div className="card-body">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link active text-reset text-decoration-none" aria-current="page" href="#2">
                        <span data-feather="home" />
                        Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between alitn-items-end">
                  <div className="btn-group">
                    <button type="button" className="btn btn-link text-reset text-decoration-none">
                      <i className="fa fa-fw fa-angle-left" />
                      后退
                    </button>
                  </div>
                  <span className="h1">12213</span>
                  <ul className="list-inline align-self-end">
                    <li className="list-inline-item">1123</li>
                    <li className="list-inline-item">2234</li>
                  </ul>
                </div>
                <div className="card bg-dark h-100">
                  <div className="card-header">
                    HEADER
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">NAME</label>
                      <input type="text" placeholder="1123123123" className="form-control rounded-0 input-underscore" />
                    </div>
                    {/* 1
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p>
                    <p className="lead">89</p> */}
                  </div>
                  <div className="card-footer">
                    FOOTER
                  </div>
                </div>
              </div>
              {/* <div className="card shadow bg-dark h-100 w-100 workspace">
                <div className="card-body">
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                  <p className="lead">89</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <div className="container-fluid">
          <p className="lead py-0">
            Copyright
          </p>
        </div>
      </footer>
    </div>
  );
}
