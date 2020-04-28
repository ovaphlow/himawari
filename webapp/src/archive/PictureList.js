import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'

export default function PictureList() {
  const { id } = useParams()
  // const [picture_index, setPictureIndex] = useState([])
  const [picture_list, setPictureList] = useState([])

  useEffect(() => {
    ;(async id => {
      let res = await window.fetch(`/api/archive/${id}/picture/`)
      res = await res.json()
      // const list = []
      const loop = async (picture_index, index, picture_list) => {
        if (index >= picture_index.length) return
        let _res = await window.fetch(`/api/archive/${picture_index[index].master_id}/picture/${picture_index[index].id}`)
        _res = await _res.json()
        picture_list.push(_res.content)
        // console.info(picture_list)
        setPictureList(picture_list)
        loop(picture_index, ++index, picture_list)
      }
      loop(res.content, 0, [])
    })(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">查看档案图像</h3>
        <hr />

        <Toolbar id={id} />

        <div className="card shadow">
          <div className="card-body">
            <div className="row row-cols-3">
              {picture_list.map(it => (
                <div className="col pb-3" key={it.id}>
                  <a href={`#档案/${it.master_id}/图像/${it.id}`}>
                    <img src={it.content} alt={it.id} className="img-fluid rounded" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
