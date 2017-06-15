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
                    selected = (i === notes.length-1) ? notes[notes.length-2] : notes[i];
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

   render() {
    return (
        <div className="Main">
            <Sidebar callback={this.newNote.bind(this)}/>
            <NoteList callback={this.selectNote.bind(this)} notes={this.state.notes}/>
            <NoteForm callback={this.updateNote.bind(this)} delete={this.delete.bind(this)} currNote={this.state.selected} key={this.state.selected.id}/>
        </div>
    )
   } 
}

export default Main