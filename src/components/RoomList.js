import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: "",
      isVisible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.toggleRoomForm = this.toggleRoomForm.bind(this);
  }

  toggleRoomForm(){
    this.setState({ isVisible: !this.state.isVisible })
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
        {
          this.state.isVisible &&
          <Input type="text" name="name" value={this.state.name} placeholder="Add a Room.." onChange={ (e) => this.handleChange(e) } />
        }
        <Button className="btn btn-block btn-success" onClick={this.toggleRoomForm}>Add Room</Button>
        </FormGroup>
      </form>

    );

    const roomList = this.state.rooms.map((room) =>  
    
          <li className="list-group-item list-group-item-success" 
              key={room.key} 
              onClick={(e) => this.selectRoom(room, e)}>{room.name}
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
