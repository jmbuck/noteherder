import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css';
import Main from './Main'
import base, { auth } from './base'
import SignIn from './SignIn'

class App extends Component {
  constructor() {
    super()
    this.state = {
      notes: {},
      selected: this.blankNote(),
      uid: null,
    }
  }

  componentWillMount(){
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
         if(user) {
           //Finish Signing in
           this.authHandler(user)
         } else {
           //Finish Signing out
           this.setState({ uid: null })
         }
      }
    )
  }

  getUserFromLocalStorage() {
    const uid = localStorage.getItem('uid')
    if(!uid) return
    this.setState({ uid })
  }

  blankNote = () => {
      return {
        title: '',
        body: '',
        id: null,
      }
  }

   saveNote = (note) => { 
        if (!note.id) {
          note.id = `note-${Date.now()}`
       }
       const notes = {...this.state.notes}
       notes[note.id] = note
       this.setState({ notes, selected: note})
   }

   selectNote = (note) => {
        this.setState({ selected: note });
   }
   
   delete = (note) => {
        const notes = {...this.state.notes}
        notes[note.id] = null;
        this.resetCurrentNote()
        this.setState({ notes })
   }

  resetCurrentNote = () => {
    this.selectNote(this.blankNote())
  }

   signedIn = () => {
       return this.state.uid
   }

   signOut = () =>{
     auth
      .signOut()
      .then(() => {
        this.stopSyncing()
        this.setState({notes: {}, selected: this.blankNote() })
      })
   }

   authHandler = (user) => {
      localStorage.setItem('uid', user.uid)
      this.setState({ uid: user.uid }, this.syncNotes)
   }

  syncNotes = () => {
        this.ref = base.syncState(
           `notes/${this.state.uid}`, 
        {
           context: this,
           state: 'notes',
       }
       )
   }

   stopSyncing = () => {
      if(this.ref) {
        base.removeBinding(this.ref)
      }
   }

  render() {
    const actions = {
      saveNote: this.saveNote,
      delete: this.delete,
      selectNote: this.selectNote,
      resetCurrentNote: this.resetCurrentNote,
      signOut: this.signOut,
    }
    const noteData = {
      notes: this.state.notes,
      selected: this.state.selected,
    }

    return (
      <div className="App">
       <Switch>
          <Route path="/notes" render={() =>
            this.signedIn() 
            ? <Main {...noteData} {...actions} />
            : <Redirect to='/sign-in' />
          }/>
          <Route path="/sign-in" render={() => 
            !this.signedIn() 
            ? <SignIn />
            : <Redirect to='/notes' />
          }/>
          <Route  render={() => <Redirect to="/notes" />}/>
        </Switch>
       {/*{this.signedIn() ? this.renderMain() : <SignIn />}*/}
      </div>
    );
  }
}

export default App;
