import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import base from './base.js'
import SignIn from './SignIn'
import SignOut from './SignOut'

class App extends Component {
  constructor() {
    super()
    this.state = {
      uid: null,
    }
  }
  
  
   signedIn = () => {
       return this.state.uid
   }

   signOut = () =>{
     this.setState({ uid: null })
   }

   authHandler = (user) => {
      this.setState({ uid: user.uid })
   }

  renderMain = () => {
    return (
    <div>
      <SignOut signOut={this.signOut} />
      <Main />
     </div>
    )
  }

  render() {
    return (
      <div className="App">
       {this.signedIn() ? this.renderMain() : <SignIn authHandler={this.authHandler} />}
      </div>
    );
  }
}

export default App;
