import {Redirect, Route} from 'react-router-dom'

const AdminRoute = props => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const role = localStorage.getItem('role')

  if (isLoggedIn === 'true' && role === 'ADMIN') {
    return <Route {...props} />
  }

  return <Redirect to="/" />
}

export default AdminRoute
