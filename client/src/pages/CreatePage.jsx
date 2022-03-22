import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
  const auth = useContext(AuthContext)
  const navigation = useNavigate()
  const [link, setLink] = useState('')
  const { request } = useHttp()

  const pressHandler = async event => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        navigation(`/detail/${data.link._id}`)
      } catch (error) {}
    }
  }
  

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            id="link"
            type="text"
            onChange={e => setLink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor='link'>Вставте ссылку</label>
        </div>
      </div>
    </div>
  )
}
