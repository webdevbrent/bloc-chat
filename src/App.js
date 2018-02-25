import React, { Component } from 'react';
import * as firebase from 'firebase';
import config from './Config';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room){
    const messageRef = firebase.database().ref("rooms");
    const roomKey = room.key;
    const roomName = room.name;
    messageRef.update({currentRoom: roomKey, roomName: roomName});
    this.setState({ activeRoom: room });
  }
  
  render() {
    return (
      <div className="container-fluid">
      <Row>
          <Col xs="3">
          <ListGroup>
            <ListGroupItem>
              <RoomList
              firebase = { firebase }
              activeRoom={this.activeRoom} />
            </ListGroupItem>
          </ListGroup>
          </Col>
          <Col xs="9">
            <MessageList 
            firebase = { firebase }
            activeRoom={this.activeRoom.key} />
          </Col>
      </Row>
      </div>
    );
  }
}

export default App;
