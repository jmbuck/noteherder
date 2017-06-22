import React from 'react'
import { NavLink } from 'react-router-dom'

const Note = ({ note }) => {

    return (
      <NavLink to={`/noteherder/notes/${note.id}`}>
        <li>
            <div className="note">
              <div className="note-title">
                {note.title}
              </div>
              <div className="note-body">
                <p>
                 {/*Prints body of note and uses a regex that matches all html tags to replace with whitespace */
                   note.body.toString('html').replace(/(<((\/\w+)|(\w+))>)|(&nbsp;)/g, '')}
                </p>
              </div>
            </div>
        </li>
      </NavLink>
    )
}

export default Note