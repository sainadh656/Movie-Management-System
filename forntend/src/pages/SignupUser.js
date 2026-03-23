import {useState} from 'react'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const signupUser = async () => {
    // ✅ Frontend validation
    if (!username || !email || !password) {
      setMessage('All fields are required')
      return
    }

    try {
      const response = await fetch(
        'https://movie-management-system-1.onrender.com/signup/',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim().toLowerCase(), // 🔥 IMPORTANT
            password: password.trim(),
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error)
        return
      }

      setMessage('Signup successful. Please login.')
      setUsername('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(error)
      setMessage('Server error. Try again later.')
    }
  }

  return (
    <div className="form-box">
      <h2>Signup</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={signupUser} type="button">
        Signup
      </button>

      {message && <p>{message}</p>}
    </div>
  )
}
