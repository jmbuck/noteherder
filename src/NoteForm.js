import React, { Component } from 'react'
import RichTextEditor from 'react-rte'
import './NoteForm.css'

class NoteForm extends Component {
    state = {
        value: RichTextEditor.createEmptyValue()
    }

    componentWillReceiveProps(nextProps) {
        const newId = nextProps.match.params.id
        
        if(newId) {        
            if(newId !== this.props.selected.id) {
                const note = nextProps.notes[newId]
                if(note) {  
                    this.props.selectNote(note)
                    this.setState({ value: RichTextEditor.createValueFromString(nextProps.selected.body, 'html')})
                } else if(Object.keys(nextProps.notes).length > 0){
                    this.props.history.push('/notes')
                }
            }
        } else if(this.props.selected.id) {
            this.setState({ value: RichTextEditor.createEmptyValue() })
            this.props.resetCurrentNote()
        }
    }

    changeTitle = (ev) => {
        const note = {...this.props.selected}
        note.title = ev.target.value
        this.props.saveNote(note)
    }

    changeBody = (value) => {
        const note = {...this.props.selected}
        this.setState({ value })
        note.body = value.toString('html');
        this.props.saveNote(note)
    }

    handleRemove = (ev) => {
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
                            onChange={this.changeTitle}
                            value={this.props.selected.title}
                        />
                    </p>
                    <div>
                        <div className="body">
                            <RichTextEditor 
                                className="editor"
                                value={this.state.value} 
                                onChange={this.changeBody} 
                                placeholder="Just start typing..."
                            />
                        </div>
                  </div>
                <div onClick={this.handleRemove} className="delete">
                    <i className="fa fa-trash-o"></i>
                </div>
                </form>
          </div>
        )
    }

}

export default NoteForm