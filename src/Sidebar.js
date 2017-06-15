import React, { Component } from 'react'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import './Sidebar.css'

class Sidebar extends Component {
   
   newNote() {
     this.props.callback();
   }
   
   render() {
      return (
      <nav className="Sidebar">
        <div className="logo">
          <img src={quill} alt="Noteherder" />
        </div>
        <button onClick={this.newNote.bind(this)} className="new-note">
          <img src={newHover} alt="New note" />
          <img className="outline" src={newIcon} alt="New note" />
        </button>
      </nav>
    )
   }
}

export default Sidebar