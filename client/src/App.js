import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import './App.css'
import clientAuth from './clientAuth'

import NavBar from './NavBar'
import Home from './views/Home'
import Search from './views/Search'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import Profile from './views/Profile'
import LogOut from './views/LogOut'

class App extends Component {
  state = {currentUser: null}

  componentDidMount() {
    this.setState({
      currentUser: clientAuth.getCurrentUser()
    })
  }

  onLoginSuccess(user) {
    this.setState({
      currentUser: clientAuth.getCurrentUser()
    })
  }

  logOut() {
    clientAuth.logOut()
    this.setState({
      currentUser: null
    })
  }

  render() {
    const {currentUser} = this.state
    return (
      <div className="App">
        <NavBar currentUser={currentUser} />

        <Switch>
          <Route path="/login" render={(props) => {
            return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
          }} />

          <Route path="/profile" render={(props) => {
            return <Profile {...props} currentUser={currentUser} />
          }} />

          <Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

          <Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

          <Route path="/search" component={Search} />

          <Route path="/" component={Home} />

        </Switch>
      </div>
    );
  }
}

export default App;
