import React from 'react'

import quill from './quill.svg'
import { auth, githubProvider, googleProvider, facebookProvider } from './base'
import './SignIn.css'

const SignIn = () => {
    const authenticate = (provider) => {
        auth
            .signInWithPopup(provider)
    }

    return (
        <div className="SignIn">
            <div className="main-content">
                <h1 className="title"><img src={quill}></img>Noteherder</h1>
                <button className="google" onClick={() => authenticate(googleProvider)}>
                     <span className="fa fa-google icon"></span>Sign in with Google
                </button>
                <button className="facebook" onClick={() => authenticate(facebookProvider)}>
                     <span className="fa fa-facebook icon"></span>Sign in with Facebook
                </button>
                <button className="github" onClick={() => authenticate(githubProvider)}>
                     <span className="fa fa-github icon"></span>Sign in with GitHub
                </button>
            </div>    
        </div>               
    )
}

export default SignIn