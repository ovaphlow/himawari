import React from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'

function PictureList() {
  const { id } = useParams()
  const [dataPicture, setDataPicture] = React.useState([])

  React.useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/archive/${id}/picture/`)
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      setDataPicture(res.content)
    }
    fetchData(id)
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
              {dataPicture.map(it => (
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

export default PictureList
