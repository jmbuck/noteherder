import React from 'react'

import quill from './quill.svg'
import {auth, githubProvider, googleProvider} from './base'
import './SignIn.css'

const SignIn = () => {
    const authenticate = (provider) => {
        auth
            .signInWithPopup(provider)
    }

    return (
        <div className="SignIn">
            <div className="main-content">
                <h1 className="title logo"><img src={quill}></img>Noteherder</h1>
                <button className="github" onClick={() => authenticate(githubProvider)}>
                     <span className="fa fa-github"></span> Sign in with GitHub
                </button>
                <button className="google" onClick={() => authenticate(googleProvider)}>
                     <span className="fa fa-google"></span> Sign in with Google
                </button>
            </div>    
        </div>               
    )
}

export default SignIn