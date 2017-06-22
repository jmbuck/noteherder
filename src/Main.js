import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'

const Main = (props) => {
    return (
        <div className="Main">
            <Sidebar signOut={props.signOut}/>
            <NoteList notes={props.notes}/>

            <Switch>
                <Route path="/noteherder/notes/:id" render={(navProps) => (
                    <NoteForm {...props} {...navProps} />
                )} />
                <Route path="/noteherder/notes" render={(navProps) => (
                    <NoteForm {...props} {...navProps} />
                )} />
            </Switch>
        </div>
    )
}

export default Main