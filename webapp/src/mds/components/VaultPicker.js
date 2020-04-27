import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function VaultPicker(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const res = await axios.get('/api/vault/')
      setData(res.data.content)
    })()
  }, [])

  return (
    <div className="form-group">
      <label>档案所在地</label>
      <select name={props.name || 'vault_id'} value={props.value}
        className="form-control"
        onChange={props.onChange}
      >
        <option value="0">未选择</option>
        {
          data.map(it => (
            <option value={it.id} key={it.id}>{it.name}</option>
          ))
        }
      </select>
    </div>
  )
}
