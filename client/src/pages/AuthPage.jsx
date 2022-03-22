import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)  
  const { loading, request, error, clearError } = useHttp()
  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const [form, setForm] = React.useState(
    {email: '', password: '',}
  )

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [name]: value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      console.log(data);
    } catch (error) {
      
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Сократи ссылку</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input 
                  id="email" 
                  type="text"  
                  name='email'
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor='email'>Введите email</label>
              </div>

              <div className="input-field">
                <input
                  id="password" 
                  type="password" 
                  name='password'
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor='password'>введите пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button 
              className='btn yellow darken-4' 
              onClick={loginHandler}
              disabled={loading}
              style={{ marginRight: 10 }}
            >
              Войти
            </button>
            <button 
              className='btn grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
