import React, { Component } from 'react'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'
import base from './base.js'

class Main extends Component {
   render() {
    return (
        <div className="Main">
            <Sidebar newNote={this.props.newNote} signOut={this.props.signOut}/>
            <NoteList selectNote={this.props.selectNote} notes={this.props.notes}/>
            <NoteForm {...this.props} />
        </div>
    )
   } 
}

export default Main