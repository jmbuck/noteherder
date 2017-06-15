import React from 'react'
import './NoteList.css'
import Note from './Note'

const NoteList = (props) => {
      return (
        <div className="NoteList">
            <h3>Notes</h3>
            <ul id="notes">
              {props.notes.map((note, i) => <Note key={i} title={note.title} body={note.body} id={note.id} selectNote={props.selectNote} />)}
            </ul>
          </div>
    )
}

export default NoteList