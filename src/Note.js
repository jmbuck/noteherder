import React from 'react'
import './Note.css'

const Note = (props) => {
    return (
      <a onClick={() => props.selectNote({title: props.title, body: props.body, id: props.id})}>
        <li>
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
      </a>
    )
}

export default Note