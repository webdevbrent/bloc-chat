import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

const config = {
  apiKey: 'AIzaSyDsoA329VlopARaLKn9oWCPLS_77CcSec8',
  authDomain: 'bloc-chat-8f25f.firebaseapp.com',
  databaseURL: 'https://bloc-chat-8f25f.firebaseio.com',
  projectId: 'bloc-chat-8f25f',
  storageBucket: 'bloc-chat-8f25f.appspot.com',
  messagingSenderId: '1068372700222',
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room) {
    this.setState({activeRoom: room});
  }
  
  render() {
    const showMessages = this.state.activeRoom;

    return (
      <div className="container-fluid">
      <Row>
          <Col xs="3">
          <h1> Bloc Chat </h1>
          <ListGroup>
            <ListGroupItem>
              <RoomList
              firebase = { firebase }
              activeRoom={ this.activeRoom }
               />
            </ListGroupItem>
          </ListGroup>
          </Col>
          <Col xs="9">
          <h1>{this.state.activeRoom.name ||'Select room'}</h1>
          { showMessages ? 
            (<MessageList 
              firebase = { firebase }
              activeRoom={ this.state.activeRoom.key }
              />)
            : (null)
          }
          </Col>
      </Row>
      </div>
    );
  }
}

export default App;
