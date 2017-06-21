import React from 'react'
import './Note.css'

const Note = ({ note, selectNote }) => {
    return (
      <a onClick={() => selectNote(note)}>
        <li>
            <div className="note">
              <div className="note-title">
                {note.title}
              </div>
              <div className="note-body">
                <p>
                 {note.body}
                </p>
              </div>
            </div>
        </li>
      </a>
    )
}

export default Note