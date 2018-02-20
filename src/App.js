import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDsoA329VlopARaLKn9oWCPLS_77CcSec8",
  authDomain: "bloc-chat-8f25f.firebaseapp.com",
  databaseURL: "https://bloc-chat-8f25f.firebaseio.com",
  projectId: "bloc-chat-8f25f",
  storageBucket: "bloc-chat-8f25f.appspot.com",
  messagingSenderId: "1068372700222"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
