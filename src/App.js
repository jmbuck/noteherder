import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import base, { auth } from './base'
import SignIn from './SignIn'
import SignOut from './SignOut'

class App extends Component {
  constructor() {
    super()
    const initialNote = {title: '', body: '', id: 0};
    this.state = {
      notes: [initialNote],
      selected: initialNote,
      maxID: 1,
      uid: null,
    }
  }

  componentWillMount(){
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

   newNote() {
       const notes = [...this.state.notes]
       const note = {title: '', body: '', id: this.state.maxID};
       notes.unshift(note)
       this.setState({ notes, selected: note, maxID: this.state.maxID + 1 })
       return note;
   }

   selectNote(note) {
        this.setState({ selected: note});
   }
   
   updateNote(note) {
        const notes = [...this.state.notes]
        notes.map((currNote, i) =>{
            if(currNote.id === note.id) {
                currNote.title = note.title
                currNote.body = note.body
            }
        })
        this.setState({ notes })
   }

   delete() {
        const notes = [...this.state.notes]
        let selected
        notes.map((note, i) =>{
            if(note.id === this.state.selected.id) {
                if(notes.length > 1) {   
                    selected = (i === notes.length-1) ? notes[notes.length-2] : notes[i+1];
                } else {
                    const newNote = this.newNote();
                    notes.push(newNote);
                    selected = newNote;
                }
                notes.splice(i, 1);   
            }
        })
        this.setState({ notes, selected })
   }

  
  
   signedIn = () => {
       return this.state.uid
   }

   signOut = () =>{
     auth
      .signOut()
      .then(() => {
        base.removeBinding(this.ref)
        this.setState({notes: []})
      })
   }

   authHandler = (user) => {
      this.setState({ uid: user.uid }, this.syncNotes)
   }

  syncNotes = () => {
        this.ref = base.syncState(
           `${this.state.uid}/notes`, 
        {
           context: this,
           state: 'notes',
       }
       )
   }

  renderMain = () => {
    return (
    <div>
      <SignOut signOut={this.signOut} />
      <Main notes={this.state.notes} newNote={this.newNote.bind(this)} selectNote={this.selectNote.bind(this)} updateNote={this.updateNote.bind(this)} delete={this.delete.bind(this)} selected={this.state.selected} />
     </div>
    )
  }

  render() {
    return (
      <div className="App">
       {this.signedIn() ? this.renderMain() : <SignIn />}
      </div>
    );
  }
}

export default App;
