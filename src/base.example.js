//After filling in the pertinent information here,
//change the file name to base.js to use app
//You will also have to set up github, google,
//and facebook authentication from the Firebase console

import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'

const app = firebase.initializeApp({
    apiKey: "API KEY",
    authDomain: "[YOUR APP].firebaseapp.com",
    databaseURL: "https://[YOUR APP].firebaseio.com",
    projectId: "YOUR APP",
    storageBucket: "[YOUR APP].appspot.com",
    messagingSenderId: "YOUR MESSAGING SENDER ID"
  })

  const db = database(app)

export const auth = app.auth();
export const githubProvider = new firebase.auth.GithubAuthProvider()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()

export default Rebase.createClass(db)