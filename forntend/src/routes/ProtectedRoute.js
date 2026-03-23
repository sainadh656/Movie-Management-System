import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if (isLoggedIn === 'true') {
    return <Route {...props} />
  }

  return <Redirect to="/LoginUser" />
}

export default ProtectedRoute
