import React, { Component } from 'react'
import './NoteForm.css'

class NoteForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            body: '',
        }
    }

    componentDidMount() {
        this.setState({title: this.props.currNote.title, body: this.props.currNote.body})
        document.querySelector('.NoteForm .title').value = this.props.currNote.title;
        document.querySelector('.NoteForm .body').value = this.props.currNote.body;
    }

    updateNote(ev) {
        this.setState({title: this.titleInput.value, body: this.bodyInput.value})
        this.props.callback({title: this.titleInput.value, body: this.bodyInput.value, id: this.props.currNote.id})
    }

    delete() {
        this.props.delete()
    }

    render() {
        return (
            <div className="NoteForm">
                <form onKeyUp={this.updateNote.bind(this)}>
                    <div onClick={this.delete.bind(this)} className="delete">
                        <i className="fa fa-trash-o"></i>
                    </div>
                    <p>
                            <input 
                                type="text" 
                                className="title"
                                name="title" 
                                placeholder="Title your note" 
                                ref={input => this.titleInput = input} 
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
                            ref={input => this.bodyInput = input}
                        ></textarea>
                 </p>
                </form>
          </div>
        )
    }

}

export default NoteForm