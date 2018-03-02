import React, { Component } from 'react';
import firebase from './firebase';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeRoom: "", user: null};
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  activeRoom(room) {
    this.setState({activeRoom: room});
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {

    const showMessages = this.state.activeRoom;
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div className="container-fluid">
      <Row>
          <Col xs="3">
          <h1 className="text-center text-uppercase font-weight-bold text-primary"> Let's Chat </h1>
          <ListGroup>
            <ListGroupItem>
              <RoomList
              firebase = { firebase }
              activeRoom={ this.activeRoom }
               />
            </ListGroupItem>
            <ListGroupItem>
              <User firebase={ firebase } setUser={ this.setUser } welcome={ currentUser } />
            </ListGroupItem>
          </ListGroup>
          </Col>
          <Col xs="9">
          <h1>{this.state.activeRoom.name ||'Please, Select a room'}</h1>
          { showMessages ? 
            <MessageList 
              firebase = { firebase }
              activeRoom={ this.state.activeRoom.key }
              user = { this.state.user ? this.state.user.displayName : "Not Willing To Login"}
              />
            : null
          }
          </Col>
      </Row>
      </div>
    );
  }
}

export default App;
