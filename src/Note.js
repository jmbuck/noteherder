import React from 'react'
import './Note.css'

const Note = (props) => {
    return (
        <li onClick={() => props.selectNote({title: props.title, body: props.body, id: props.id})}>
            <div className="note">
              <div className="note-title">
                {props.title}
              </div>
              <div className="note-body">
                <p>
                 {props.body}
                </p>
              </div>
            </div>
        </li>
    )
}

export default Note