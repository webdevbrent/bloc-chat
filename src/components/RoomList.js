import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', (snapshot) => {
      const room = snapshot.val();
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    return (
      <div>
        {/* Get all rooms */}
        {this.state.rooms.map(rooms => rooms)}
        <h1>{this.state.rooms}</h1>
      </div>
    );
  }
} 

export default RoomList;
