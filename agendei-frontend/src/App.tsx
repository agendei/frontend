import React from 'react';
import logo from './logo.svg';
import './App.css';
import "firebase/auth";
import * as config from './config/firebase.config.json'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp(config);
const App: React.FC = () => {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
  {
    // my app code
  }
</FirebaseAuthProvider>
  );
}

export default App;
