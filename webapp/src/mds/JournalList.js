import React, { useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'

export default function JournalList() {
  const [list, setList] = useState([])

  useEffect(() => {
    setList([])
  }, [])

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">
          <i className="fa fa-fw fa-history"></i>
          操作记录
        </h3>

        <hr />

        <div className="card shadow">
          <div className="card-header">
            查询条件
          </div>

          <div className="card-body">
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="text-right">序号</th>
                  <th>日期</th>
                  <th>时间</th>
                  <th>用户</th>
                  <th>操作</th>
                  <th>档案</th>
                </tr>
              </thead>

              <tbody>
                {list.map(it => (
                  <tr key={it.id}>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
