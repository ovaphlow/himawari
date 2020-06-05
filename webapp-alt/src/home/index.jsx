import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Navbar from '../ComponentNavbar';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/"><Home /></Route>
      </Switch>
    </HashRouter>
  );
}

function Home() {
  const [filter, setFilter] = useState('');

  const handleSearch = async () => {
    const response = await window.fetch('/api/archive/search', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location = `archive.html#/${res.content.id}?uuid=${res.content.uuid}`;
  };

  return (
    <>
      <Navbar category="home" />

      <div className="container">
        <div className="row mt-5">
          <div className="col-8 offset-2 text-center">
            <div className="form-group">
              <label className="lead">输入档案号或身份证</label>
              <input
                type="search"
                value={filter || ''}
                className="form-control form-control-lg text-center"
                onChange={(event) => setFilter(event.target.value)}
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={handleSearch}>
              <i className="fa fa-fw fa-search" />
              查询
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
