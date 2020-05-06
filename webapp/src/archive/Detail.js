import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import VaultPicker from '../mds/components/VaultPicker'

export default function Detail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [opt, setOpt] = useState('')
  const [sn, setSN] = useState('')
  const [sn_alt, setSNAlt] = useState('')
  const [id_card, setIdCard] = useState('')
  const [name, setName] = useState('')
  const [bday, setBday] = useState('')
  const [gender, setGender] = useState('')
  const [tel, setTel] = useState('')
  const [remark, setRemark] = useState('')
  const [vault_id, setVaultID] = useState(0)
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      const _opt = new URLSearchParams(location.search).get('opt')
      if (_opt === '中转区') {
        setOpt(_opt)
        ;(async id => {
          const response = await fetch(`/api/archive/isolate/${id}`)
          const res = await response.json()
          setSN(res.content.sn)
          setSNAlt(res.content.sn_alt)
          setIdCard(res.content.id_card)
          setName(res.content.name)
          setBday(res.content.bday)
          setGender(res.content.gender)
          setTel(res.content.tel)
          setRemark(res.content.remark)
          setVaultID(res.content.vault_id)
          setReason(res.content.reason)
        })(id)
        return
      }

      ;(async id => {
        const response = await window.fetch(`/api/archive/${id}`)
        const res = await response.json()
        setSN(res.content.sn)
        setSNAlt(res.content.sn_alt)
        setIdCard(res.content.id_card)
        setName(res.content.name)
        setBday(res.content.bday)
        setGender(res.content.gender)
        setTel(res.content.tel)
        setRemark(res.content.remark)
        setVaultID(res.content.vault_id)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleIdCardBlur = () => {
    let b = `${id_card.slice(6, 10)}-${id_card.slice(10, 12)}-${id_card.slice(12, 14)}`
    setBday(b)
  }

  const handleSave = async () => {
    if (!!!sn || !!!id_card || !!!name) {
      window.alert('请完整填写所需信息')
      return
    }
    if (id_card.length !== 18) {
      window.alert('身份证长度错误')
      return
    }

    const data = {
      sn: sn,
      sn_alt: sn_alt,
      id_card: id_card,
      name: name,
      bday: bday,
      gender: gender,
      tel: tel,
      remark: remark,
      vault_id: vault_id
    }

    if (props.category === '转入') {
      let res = await fetch(`/api/archive/check-valid`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      res = await res.json()
      if (res.content.length > 0) {
        window.alert('档案号或身份证与现有档案冲突')
        return
      }

      res = await window.fetch(`/api/archive/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      res = await res.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#档案/查询'
    } else if (props.category === '编辑') {
      if (opt === '中转区') {
        const response = await fetch(`/api/archive/isolate/${id}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(Object.assign({
            reason: reason
          }, data))
        })
        const res = await response.json()
        if (res.message) {
          window.alert(res.message)
          return
        }
        window.location = '#档案/中转区'
        return
      }
      let response = await window.fetch(`/api/archive/check-valid-with-id`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(Object.assign({ id: id }, data))
      })
      let res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      if (res.content.length > 0) {
        window.alert('档案号或身份证与现有档案冲突')
        return
      }

      response = await window.fetch(`/api/archive/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location.reload(true)
    }
  }

  const handleSaveAndCapture = async () => {
    if (!!!sn || !!!id_card || !!!name) {
      window.alert('请完整填写所需信息')
      return
    }
    if (id_card.length !== 18) {
      window.alert('身份证长度错误')
      return
    }

    const data = {
      sn: sn,
      sn_alt: sn_alt,
      id_card: id_card,
      name: name,
      bday: bday,
      gender: gender,
      tel: tel,
      remark: remark,
      vault_id: vault_id
    }

    let response = await fetch(`/api/archive/check-valid`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    let res = await response.json()
    if (res.content.length > 0) {
      window.alert('档案号或身份证与现有档案冲突')
      return
    }

    response = await window.fetch(`/api/archive/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = `#档案/${res.content}/扫描`
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    if (opt === '中转区') {
      const response = await fetch(`/api/archive/isolate/${id}`, {
        method: 'DELETE'
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.location = '#档案/中转区'
      return
    }
    const response = await window.fetch(`/api/archive/${id}`, {
      method: 'DELETE'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.history.go(-1)
  }

  const handleTransferIn = async () => {
    if (!!!sn || !!!id_card || !!!name) {
      window.alert('请完整填写所需信息')
      return
    }
    if (!!!window.confirm('确定要将当前数据转入档案库？')) return

    const data = {
      sn: sn,
      sn_alt: sn_alt,
      id_card: id_card,
      name: name,
      bday: bday,
      gender: gender,
      tel: tel,
      remark: remark,
      vault_id: vault_id
    }

    let response = await fetch(`/api/archive/check-valid`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    let res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    if (res.content.length > 0) {
      window.alert('当前数据中的档案号或身份证与档案库中已有的档案相冲突')
      return
    }
    response = await fetch(`/api/archive/transfer-in`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(Object.assign({
        id: id
      }, data))
    })
    res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#档案/中转区'
  }

  return (
    <div className="row mt-3">
      <div className="col-3 col-lg-2">
        <Sidebar />
      </div>

      <div className="col-9 col-lg-10">
        <h3 className="text-muted">{props.category} 档案</h3>
        <hr />

        {props.category === '编辑' && (
          <Toolbar id={id} />
        )}

        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="form-group col-3">
                <label>档案号</label>
                <input type="text" name="sn" value={sn || ''}
                  className="form-control"
                  onChange={event => setSN(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>附加档案号</label>
                <input type="text" name="sn_alt" value={sn_alt || ''}
                  className="form-control"
                  onChange={event => setSNAlt(event.target.value)}
                  readOnly
                />
              </div>

              <div className="col-3">
                <VaultPicker name="vault_id" value={vault_id}
                  onChange={event => setVaultID(event.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label>身份证</label>
                <input type="text" name="id_card" value={id_card || ''}
                  className="form-control"
                  onChange={event => setIdCard(event.target.value)}
                  onBlur={handleIdCardBlur}
                />
              </div>

              <div className="form-group col">
                <label>姓名</label>
                <input type="text" name="name" value={name || ''}
                  className="form-control"
                  onChange={event => setName(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>出生日期</label>
                <input type="text" value={bday || ''}
                  className="form-control"
                  onChange={event => setBday(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>性别</label>
                <select className="form-control" value={gender || ''}
                  onChange={event => setGender(event.target.value)}
                >
                  <option value="">未选择</option>
                  <option value="女">女</option>
                  <option value="男">男</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-3">
                <label>联系电话</label>
                <input type="text" value={tel || ''}
                  className="form-control"
                  onChange={event => setTel(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>备注</label>
                <input type="text" name="remark" value={remark || ''}
                  className="form-control"
                  onChange={event => setRemark(event.target.value)}
                />
              </div>
            </div>
            
            {opt === '中转区' && (
              <div className="form-group">
                <label>转出原因</label>
                <input type="text" value={reason || ''}
                  className="form-control"
                  onChange={event => setReason(event.target.value)}
                />
              </div>
            )}
          </div>

          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-outline-secondary"
                onClick={() => window.history.go(-1)}
              >
                返回
              </button>
            </div>

            <div className="btn-group pull-right">
              {props.category === '转入' && (
                <button type="button" className="btn btn-success" onClick={handleSaveAndCapture}>
                  <i className="fa fa-fw fa-camera"></i>
                  保存并扫描档案
                </button>
              )}

              {props.category === '编辑' && (
                <button type="button" className="btn btn-outline-danger" onClick={handleRemove}>
                  <i className="fa fa-fw fa-trash-o"></i>
                  删除
                </button>
              )}
              
              {props.category === '编辑' && opt === '中转区' && (
                <button type="button" className="btn btn-outline-info"
                  onClick={handleTransferIn}
                >
                  <i className="fa fa-fw fa-download"></i>
                  转入档案库
                </button>
              )}

              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <i className="fa fa-fw fa-check"></i>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
