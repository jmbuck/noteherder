import React, { Component } from 'react'
import './NoteForm.css'

class NoteForm extends Component {
    componentWillReceiveProps(nextProps) {
        const newId = nextProps.match.params.id

        if(newId) {        
            if(newId !== this.props.selected.id) {
                const note = nextProps.notes[newId]
                if(note) {  
                    this.props.selectNote(note)
                } else if(Object.keys(nextProps.notes).length > 0){
                    this.props.history.push('/notes')
                }
            }
        } else if(this.props.selected.id) {
            this.props.resetCurrentNote()
        }
    }

    handleChanges = (ev) => {
        const note = {...this.props.selected}
        note[ev.target.name] = ev.target.value
        this.props.saveNote(note)
    }

    handleRemove = (ev) => {
        console.log(this.props.selected)
        this.props.delete(this.props.selected)
    }

    render() {
        return (
            <div className="NoteForm">
                <form>
                    <p>
                            <input 
                                type="text" 
                                className="title"
                                name="title" 
                                placeholder="Title your note" 
                                onChange={this.handleChanges}
                                value={this.props.selected.title}
                                autoFocus
                            />
                    </p>
                    <p>
                        <textarea 
                            className="body"
                            name="body" 
                            cols="30" 
                            rows="10" 
                            placeholder="Just start typing..." 
                            onChange={this.handleChanges}
                            value={this.props.selected.body}
                        ></textarea>
                 </p>
                <div onClick={this.handleRemove} className="delete">
                    <i className="fa fa-trash-o"></i>
                </div>
                </form>
          </div>
        )
    }

}

export default NoteForm