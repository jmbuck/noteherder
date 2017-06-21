import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'

class Main extends Component {
   render() {
    return (
        <div className="Main">
            <Sidebar signOut={this.props.signOut}/>
            <NoteList selectNote={this.props.selectNote} notes={this.props.notes}/>

            <Switch>
                <Route path="/notes/:id" render={(navProps) => (
                    <NoteForm {...this.props} {...navProps} />
                )} />
                <Route path="/notes" render={(navProps) => (
                    <NoteForm {...this.props} {...navProps} />
                )} />
            </Switch>
        </div>
    )
   } 
}

export default Main