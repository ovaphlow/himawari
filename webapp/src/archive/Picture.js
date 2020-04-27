import React from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'

function Picture() {
  const { master_id, id } = useParams()
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    fetchData(id, master_id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async (id, master_id) => {
    const response = await fetch(`/api/archive/${master_id}/picture/${id}`)
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    setData(res.content)
  }

  const handlePrevious = () => {
    window.location = `#档案/${data.master_id}/图像/${data.prev_id}`
    fetchData(data.prev_id, data.master_id)
  }

  const handleNext = () => {
    window.location = `#档案/${data.master_id}/图像/${data.next_id}`
    fetchData(data.next_id, data.master_id)
  }

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">档案图像</h3>
        <hr />

        <Toolbar id={id} />

        <div className="card shadow mb-5">
          <div className="card-header">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-dark"
                onClick={() => window.location = `#档案/${data.master_id}/图像`}
              >
                返回
              </button>
            </div>

            <div className="btn-group pull-right">
              {data.prev_id && (
                <button type="button" className="btn btn-sm btn-outline-info"
                  onClick={handlePrevious}
                >
                  <i className="fa fa-fw fa-arrow-left"></i>
                  上一张
                </button>
              )}
              {data.next_id && (
                <button type="button" className="btn btn-sm btn-outline-info"
                  onClick={handleNext}
                >
                  <i className="fa fa-fw fa-arrow-right"></i>
                  下一张
                </button>
              )}
            </div>
          </div>

          <div className="card-body">
            <img src={data.content} alt={data.id} className="img-fluid rounded mx-auto d-block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Picture