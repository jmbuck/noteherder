import React, { Component } from 'react'
import './Note.css'

class Note extends Component {

    handleClick() {
        this.props.callback({title: this.props.title, body: this.props.body, id: this.props.id})
    }

    render() {
        return (
        <li onClick={this.handleClick.bind(this)}>
            <div className="note">
              <div className="note-title">
                {this.props.title}
              </div>
              <div className="note-body">
                <p>
                 {this.props.body}
                </p>
              </div>
            </div>
          </li>
        )
    }



}

export default Note