import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'
import './App.css'
import Home from './pages/Home'
import Movies from './pages/Movies'
import AddMovie from './pages/AddMovie'
import UpdateMovie from './pages/UpdateMovie'
import DeleteMovie from './pages/DeleteMovie'
import Directors from './pages/Directors'
import DirectorMovies from './pages/DirectorMovies'
import SearchMovies from './pages/SearchMovies'
import AddDirector from './pages/AddDirector'
import DeleteDirector from './pages/DeleteDirector'
import LoginUser from './pages/LoginUser'
import SignupUser from './pages/SignupUser'
import Watchlist from './pages/Watchlist'
import Users from './pages/Users'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/LoginUser" component={LoginUser} />
          <Route path="/SignupUser" component={SignupUser} />
          <Route path="/movies" component={Movies} />

          <ProtectedRoute path="/directors" component={Directors} />
          <ProtectedRoute path="/director-movies" component={DirectorMovies} />
          <ProtectedRoute path="/search" component={SearchMovies} />
          <ProtectedRoute path="/watchlist" component={Watchlist} />
          <ProtectedRoute path="/add-movie" component={AddMovie} />

          <AdminRoute path="/update-movie" component={UpdateMovie} />
          <AdminRoute path="/users" component={Users} />
          <AdminRoute path="/delete-movie" component={DeleteMovie} />
          <AdminRoute path="/add-director" component={AddDirector} />
          <AdminRoute path="/delete-director" component={DeleteDirector} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
