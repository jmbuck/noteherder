import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Main from './Main'
import base, { auth } from './base'
import SignIn from './SignIn'

//Make the sign in form prettier
//Add rich text editor to the form


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
       let redirect = false;
       if (!note.id) {
          note.id = `note-${Date.now()}`
          redirect = true;
       }
       const notes = {...this.state.notes}
       notes[note.id] = note
       this.setState({ notes, selected: note})

       if(redirect) {
         this.props.history.push(`/notes/${note.id}`)
       }
   }

   selectNote = (note) => {
        this.setState({ selected: note });
   }
   
   delete = (note) => {
        const notes = {...this.state.notes}
        notes[note.id] = null;
        this.resetCurrentNote()
        this.setState({ notes })
        this.props.history.push('/notes')    
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
