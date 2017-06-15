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

   componentDidMount() {
        //load
        let maxID = 0;
        const notes = JSON.parse(localStorage.getItem('notes'));
        if(notes !== null) {
            notes.map(note => {
                if(note.id > maxID) maxID = note.id;
            })
            this.setState({notes, selected: notes[0], maxID: maxID+1})
        }
   }

   save() {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
   }

   newNote() {
       const notes = [...this.state.notes]
       const note = {title: '', body: '', id: this.state.maxID};
       notes.unshift(note)
       this.setState({ notes, selected: note, maxID: this.state.maxID + 1 }, this.save.bind(this))
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
        this.setState({ notes }, this.save.bind(this))
   }

   delete() {
        const notes = [...this.state.notes]
        let selected
        notes.map((note, i) =>{
            if(note.id === this.state.selected.id) {
                if(notes.length > 1) {
                  
                    selected = (i === notes.length-1) ? notes[notes.length-2] : notes[i+1];
                    console.log('made it here');
                } else {
                    const newNote = this.newNote();
                    notes.push(newNote);
                    selected = newNote;
                }
                notes.splice(i, 1);   
            }
        })
        this.setState({ notes, selected }, this.save.bind(this))
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