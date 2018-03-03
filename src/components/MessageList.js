import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", content: "", sentAt: "", roomId: "", messages: []};
        this.handleChange = this.handleChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.messagesRef = this.props.firebase.database().ref("messages");  
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
          username: this.props.user,
          content: e.target.value,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          roomId: this.props.activeRoom
        });
      }

      createMessage(e) {
        e.preventDefault();
        this.messagesRef.push({
          username: this.state.username,
          content: this.state.content,
          sentAt: this.state.sentAt,
          roomId: this.state.roomId
        });
        this.setState({ username: "", content: "", sentAt: "", roomId: "" });
      }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) });
        });
    }

    render() {
        const activeRoom = this.props.activeRoom;

        const messageBar = (
            <form onSubmit={this.createMessage}>
                <FormGroup>
                    <Input
                        type="text"
                        value={this.state.content}
                        placeholder="Enter Message"
                        onChange={ (e) => this.handleChange(e) }
                    />
                    <Button type="submit" className="float-right">Send</Button>
                </FormGroup>
            </form>
        );

        const messageList = (
            this.state.messages.map((message) => {
              if (message.roomId === activeRoom) {
                return <li className="list-group-item" 
                       key={message.key}>
                       <span className="font-weight-bold text-primary">{message.username}: </span>
                       <span className="font-weight-bold">{message.content}</span>
                       </li>
              }
              return null;
            })
          );

        return (
            <div>
                <div>
                    <ul className="list-group">{messageList}</ul>
                </div>
                <div>
                    {messageBar}
                </div>
            </div>
        );
    }
}

export default MessageList;