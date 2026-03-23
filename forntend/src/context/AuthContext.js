import {createContext, useState} from 'react'

export const AuthContext = createContext()

export function AuthProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true',
  )
  const role = localStorage.getItem('role')

  const login = data => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('role', data.role)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, role, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
