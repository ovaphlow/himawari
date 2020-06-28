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
        <div className="container h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3">
              <div className="card bg-dark h-100">
                <div className="card-body">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#2">
                        <span data-feather="home" />
                        Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow bg-dark h-100 w-100">
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
              </div>
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
