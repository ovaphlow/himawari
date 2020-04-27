import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import VaultPicker from '../mds/components/VaultPicker'

export default function Detail(props) {
  const { id } = useParams()
  const [sn, setSN] = useState('')
  const [sn_alt, setSNAlt] = useState('')
  const [identity, setIdentity] = useState('')
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [cangongshijian, setCangongshijian] = useState('')
  const [zhicheng, setZhicheng] = useState('')
  const [gongling, setGongling] = useState('')
  const [yutuixiuriqi, setYutuixiuriqi] = useState('')
  const [tuixiuriqi, setTuixiuriqi] = useState('')
  const [phone, setPhone] = useState('')
  const [remark, setRemark] = useState('')
  const [vault_id, setVaultID] = useState(0)

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async id => {
        const response = await window.fetch(`/api/archive/${id}`)
        const res = await response.json()
        setSN(res.content.sn)
        setSNAlt(res.content.sn_alt)
        setIdentity(res.content.identity)
        setName(res.content.name)
        setBirthday(res.content.birthday)
        setGender(res.content.gender)
        setCangongshijian(res.content.cangongshijian)
        setZhicheng(res.content.zhicheng)
        setGongling(res.content.gongling)
        setYutuixiuriqi(res.content.yutuixiuriqi)
        setTuixiuriqi(res.content.tuixiuriqi)
        setPhone(res.content.phone)
        setRemark(res.content.remark)
        setVaultID(res.content.vault_id)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleIdentityBlur = () => {
    let b = `${identity.slice(6, 10)}-${identity.slice(10, 12)}-${identity.slice(12, 14)}`
    setBirthday(b)
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
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

  const handleSave = async () => {
    if (!!!sn || !!!identity || !!!name) {
      window.alert('请完整填写所需信息')
      return
    }
    if (identity.length !== 18) {
      window.alert('身份证长度错误')
      return
    }

    const data = {
      sn: sn,
      sn_alt: sn_alt,
      identity: identity,
      name: name,
      birthday: birthday,
      gender: gender,
      cangongshijian: cangongshijian,
      zhicheng: zhicheng,
      gongling: gongling,
      yutuixiuriqi: yutuixiuriqi,
      tuixiuriqi: tuixiuriqi,
      phone: phone,
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
    if (!!!sn || !!!identity || !!!name) {
      window.alert('请完整填写所需信息')
      return
    }
    if (identity.length !== 18) {
      window.alert('身份证长度错误')
      return
    }

    const data = {
      sn: sn,
      sn_alt: sn_alt,
      identity: identity,
      name: name,
      birthday: birthday,
      gender: gender,
      cangongshijian: cangongshijian,
      zhicheng: zhicheng,
      gongling: gongling,
      yutuixiuriqi: yutuixiuriqi,
      tuixiuriqi: tuixiuriqi,
      phone: phone,
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
                <input type="text" name="identity" value={identity || ''}
                  className="form-control"
                  onChange={event => setIdentity(event.target.value)}
                  onBlur={handleIdentityBlur}
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
                <input type="text" value={birthday || ''}
                  className="form-control"
                  onChange={event => setBirthday(event.target.value)}
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
              <div className="form-group col">
                <label>参加工作时间</label>
                <input type="text" value={cangongshijian || ''}
                  className="form-control"
                  onChange={event => setCangongshijian(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>职称</label>
                <input type="text" name="zhicheng" value={zhicheng || ''}
                  className="form-control"
                  onChange={event => setZhicheng(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>工龄</label>
                <input type="text" value={gongling || ''}
                  className="form-control"
                  onChange={event => setGongling(event.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label>预退休日期</label>
                <input type="text" value={yutuixiuriqi || ''}
                  className="form-control"
                  onChange={event => setYutuixiuriqi(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>退休日期</label>
                <input type="text" value={tuixiuriqi || ''}
                  className="form-control"
                  onChange={event => setTuixiuriqi(event.target.value)}
                />
              </div>

              <div className="form-group col">
                <label>联系电话</label>
                <input type="text" value={phone || ''}
                  className="form-control"
                  onChange={event => setPhone(event.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>备注</label>
              <input type="text" name="remark" value={remark || ''}
                className="form-control"
                onChange={event => setRemark(event.target.value)}
              />
            </div>
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
