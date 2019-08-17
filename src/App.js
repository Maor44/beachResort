import React from 'react'
import './App.scss'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Rooms} path="/rooms" />
        <Route exact component={SingleRoom} path="/rooms/:slug" />
        <Route component={Error} />
      </Switch>
    </Router>
  )
}

export default App
