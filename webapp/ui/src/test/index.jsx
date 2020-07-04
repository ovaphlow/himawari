import React from 'react';
import ReactDOM from 'react-dom';
import { TopNav, LeftNav } from '../Component';

ReactDOM.render(<Index />, document.getElementById('app'));

function Index() {
  return (
    <React.Fragment key="app">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child">
            <TopNav />
          </article>
        </div>
      </div>

      <div className="tile is-ancestor h-100 w-100 flex-row">
        <div className="tile is-vertical is-2 ml-5">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child box flex-shrink-1">
                USER & NOTIFICATION
              </article>

              <article className="tile is-child h-100 flex-grow-1">
                <LeftNav />
              </article>
            </div>
          </div>
        </div>

        <div className="tile is-parent">
          <article className="tile is-child box">
            WORKSPACE
          </article>
        </div>
      </div>

      {/* <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile box is-child">
            FOOTER
          </article>
        </div>
      </div> */}
    </React.Fragment>
  );
}
