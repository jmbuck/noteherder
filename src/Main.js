import React, { Component } from 'react'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'

class Main extends Component {
   constructor() {
       super()
       const initialNote = {title: '', body: '', id: 0};
       this.state = {
           notes: [initialNote],
           selected: initialNote,
           maxID: 1,
       }
   }

   newNote() {
       const notes = [...this.state.notes]
       const note = {title: '', body: '', id: this.state.maxID};
       notes.unshift(note)
       this.setState({ notes, selected: note, maxID: this.state.maxID + 1 })
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

   render() {
    return (
        <div className="Main">
            <Sidebar callback={this.newNote.bind(this)}/>
            <NoteList callback={this.selectNote.bind(this)} notes={this.state.notes}/>
            <NoteForm callback={this.updateNote.bind(this)} currNote={this.state.selected} key={this.state.selected.id}/>
        </div>
    )
   } 
}

export default Main