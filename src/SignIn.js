import React from 'react'
import {auth, githubProvider} from './base'
import './SignIn.css'

const SignIn = () => {
    const authenticate = () => {
        auth
            .signInWithPopup(githubProvider)
    }

    return (
        <button 
            className="SignIn"
            onClick={authenticate}
        >
            Sign In
        </button>                   
    )
}

export default SignIn