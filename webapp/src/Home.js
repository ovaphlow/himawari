import React, { useState } from 'react'

import Title from './components/Title'
import Navbar from './components/Navbar'

export default function Home() {
  const [keyword, setKeyword] = useState('')

  const handleSearch = async () => {
    const response = await window.fetch(`/api/archive/search`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ keyword: keyword })
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = `#档案/${res.content.id}`
  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container">
        <div className="row mt-5">
          <div className="col-8 offset-2 text-center">
            <div className="form-group">
              <label className="lead">输入档案号或身份证</label>
              <input type="search" value={keyword || ''}
                className="form-control form-control-lg text-center"
                onChange={event => setKeyword(event.target.value)}
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={handleSearch}>
              <i className="fa fa-fw fa-search"></i>
              查询
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
