import React from 'react'
import {auth, githubProvider, googleProvider} from './base'
import './SignIn.css'

const SignIn = () => {
    const authenticate = (provider) => {
        auth
            .signInWithPopup(provider)
    }

    return (
        <div>
            <button 
                className="SignIn"
                onClick={() => authenticate(githubProvider)}
            >
                Sign in with GitHub
            </button>
            <button 
                className="SignIn"
                onClick={() => authenticate(googleProvider)}
            >
                Sign in with Google
            </button>
        </div>                   
    )
}

export default SignIn