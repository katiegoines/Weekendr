import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import clientAuth from './clientAuth'

import NavBar from './NavBar'
// import Home from './views/Home'
import Search from './views/Search'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import Profile from './views/Profile'
import EditProfile from './views/EditProfile'
import LogOut from './views/LogOut'

class App extends Component {
  state = {currentUser: null}

  componentDidMount() {
    this.setState({
      currentUser: clientAuth.getCurrentUser()
    })
  }

  componentDidUpdate() {
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

        <div className="non-nav">
          <Switch>
            <Route path="/login" render={(props) => {
              return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
            }} />

            <Route path="/profile/edit" render={(props) => {
              return <EditProfile {...props} currentUser={clientAuth.getCurrentUser()} />
            }} />

            <Route path="/profile" render={(props) => {
              return currentUser
                ? <Profile {...props} currentUser={clientAuth.getCurrentUser()} />
                : <Redirect to="/search" />
            }} />

            <Route path="/logout" render={(props) => {
              return <LogOut onLogOut={this.logOut.bind(this)} />
            }} />

            <Route path="/signup" render={(props) => {
              return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
            }} />

            <Route path="/" render={(props) => {
              return <Search {...props} currentUser={clientAuth.getCurrentUser()} />
            }} />

            <Route path="/" component={Search} />

          </Switch>
        </div>

        
      </div>
    );
  }
}

export default App;
