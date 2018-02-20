import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';


// Initialize Firebase
const config = {
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
        <RoomList firebase = {firebase} />
      </div>
    );
  }
}

export default App;
