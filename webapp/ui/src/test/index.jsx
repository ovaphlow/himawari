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

      <div className="tile is-ancestor hh">
        <div className="tile is-vertical is-2">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child box" style={{ flexShrink: '1' }}>
                USER & NOTIFICATION
              </article>

              <article className="tile is-child hh">
                <LeftNav />
              </article>
            </div>
          </div>
        </div>

        <div className="tile is-parent hh">
          <article className="tile is-child box hh">
            WORKSPACE
          </article>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile box is-child">
            FOOTER
          </article>
        </div>
      </div>

      {/* <section>
        <TopNav />
      </section> */}

      {/* <section>
        <div className="container is-fluid">
          <div className="columns mt-4">
            <div className="column is-narrow">
              <LeftNav />
            </div>

            <div className="column">
              <div className="container is-desktop">
                <div className="box">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </React.Fragment>
  );
}
