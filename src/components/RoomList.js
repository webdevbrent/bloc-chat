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

  deleteRoom(roomKey) {
    let room = this.props.firebase.database().ref("rooms/" + roomKey);
    console.log(room);
    room.remove();
  }

  componentDidMount() {
    this.roomsRef.on('value', snapshot => {
      let roomChanges = [];
      snapshot.forEach((room) => {
        roomChanges.push({
          key: room.key,
          name: room.val().name
        });
      });
      this.setState({ rooms: roomChanges})
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
        <Button className="btn btn-block btn-success" onClick={this.createRoom}>Add Room</Button>
        </FormGroup>
      </form>

    );

    const roomList = this.state.rooms.map((room) =>  
    
          <li className="list-group-item list-group-item-success" 
              key={room.key} 
              onClick={(e) => this.selectRoom(room, e)}>{room.name}
              <button className="btn btn-danger float-right" onClick={() => this.deleteRoom(room.key)}>Remove</button>
          </li> 
  
    );

    return (
      <div>
        <div>
          <ul className="list-group">
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
