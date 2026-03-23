import {useState} from 'react'
import {useHistory} from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const history = useHistory()

  const loginUser = async () => {
    const response = await fetch(
      'https://movie-management-system-1.onrender.com/login/',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      },
    )

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('role', data.role)

      // ✅ REDIRECT HERE
      window.location.replace('/movies')
    } else {
      setMessage(data.error)
    }
  }

  return (
    <div className='form-box'>
      <h2>Login</h2>

      <input
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={loginUser} type='button'>
        Login
      </button>

      {message && <p>{message}</p>}
    </div>
  )
}
