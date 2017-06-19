import React, { Component } from 'react'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'
import base from './base.js'

class Main extends Component {
    componentWillMount() {
        console.log(this.props.notes);
    }

   render() {
    return (
        <div className="Main">
            <Sidebar newNote={this.props.newNote}/>
            <NoteList selectNote={this.props.selectNote} notes={this.props.notes}/>
            <NoteForm updateNote={this.props.updateNote} delete={this.props.delete} currNote={this.props.selected} key={this.props.selected.id}/>
        </div>
    )
   } 
}

export default Main