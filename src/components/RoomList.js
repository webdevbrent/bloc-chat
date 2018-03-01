import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({name: this.state.name});
    this.setState({ name: "" });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room)});
    });
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render() {

    const roomForm = (
      <form onSubmit={ (e) => this.createRoom(e)}>
        <FormGroup>
          <Input type="text" name="name" value={this.state.name} placeholder="Add a Room.." onChange={ (e) => this.handleChange(e) } />
          <Button>Add Room</Button>
        </FormGroup>
      </form>
    );

    const roomList = this.state.rooms.map((room) =>  
    
          <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li> 
  
    );

    return (
      <div>
        <div>
          <ul>
            {roomList}
          </ul>
        </div>
        <div>
          {roomForm}
        </div>
      </div>
    );
  }

} 

export default RoomList;
