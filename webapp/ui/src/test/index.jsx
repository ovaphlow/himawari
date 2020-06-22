import React from 'react';
import ReactDOM from 'react-dom';

import ComponentNavbar from '../ComponentNavbar';

ReactDOM.render(<Index />, document.getElementById('app'));

function Index() {
  return (
    <div>
      <ComponentNavbar />

      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <h1>
            <ol className="breadcrumb bg-dark">
              <li className="breadcrumb-item active">
                <span className="text-muted">&gt;</span>
                <strong>
                  档案库
                </strong>
                <span className="text-muted">&lt;</span>
              </li>
            </ol>
          </h1>
        </nav>

        <div className="p-2" />
      </div>

      <div className="m-5" />

      <div className="container-lg">
        <div className="card shadow bg-dark">
          <div className="card-body">
            <table className="table table-dark table-strip">
              <thead>
                <tr>
                  <th className="text-right">序号</th>
                  <th>名称</th>
                  <th>地址</th>
                  <th>电话</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
