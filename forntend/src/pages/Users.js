import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()
  const role = localStorage.getItem('role')?.toUpperCase() // ✅ normalize

  const BASE_URL = 'https://movie-management-system-1.onrender.com'

  // ✅ DEFINE FUNCTION FIRST (ESLint fix)
  const loadUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/users/`)
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ THEN USE IT
  useEffect(() => {
    if (role !== 'ADMIN') {
      history.push('/')
      return
    }

    loadUsers()
  }, [role, history])

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="users-container">
      <h2>All Users</h2>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.user_id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge ${u.role}`}>{u.role}</span>
                </td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && <p>No users found</p>}
    </div>
  )
}
