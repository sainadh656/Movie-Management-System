import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Movies from './pages/Movies'
import AddMovie from './pages/AddMovie'
import UpdateMovie from './pages/UpdateMovie'
import DeleteMovie from './pages/DeleteMovie'
import Directors from './pages/Directors'
import DirectorMovies from './pages/DirectorMovies'
import SearchMovies from './pages/SearchMovies'
import AddDirector from './pages/AddDirector'

import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={Movies} />
          <Route path="/add-movie" component={AddMovie} />
          <Route path="/update-movie" component={UpdateMovie} />
          <Route path="/delete-movie" component={DeleteMovie} />
          <Route path="/directors" component={Directors} />
          <Route path="/add-director" component={AddDirector} />
          <Route path="/director-movies" component={DirectorMovies} />
          <Route path="/search" component={SearchMovies} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
