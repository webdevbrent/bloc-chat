import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "Guest", content: "", sentAt: "", messages: []};
        this.handleChange = this.handleChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.messagesRef = this.props.firebase.database().ref('messages');  
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
          content: e.target.value,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
      }

      createMessage(e) {
        e.preventDefault();
          this.messagesRef.push({
            username: this.state.username,
            content: this.state.content,
            sentAt: this.state.sentAt
          });
          this.setState({ content: "", sentAt: ""});
      }

    componentDidMount() {
        this.messagesRef.on('value', snapshot => {
            const newMessages = [];
            snapshot.forEach((message) => {
                newMessages.push({
                    id: message.key,
                    username: message.val().username,
                    content: message.val().content,
                    sentAt: message.val().sentAt,
                    roomId: message.key
                });
                console.log(newMessages);
            });
            this.setState({messages: newMessages});
        });
      }

    render() {
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

        const messageList = this.state.messages.map((message, index) =>
                <li key={index}>
                    <p>Message Key {message.id}</p>
                    <p>Username: {message.username}</p>
                    <p>Message: {message.content}</p>
                    <p>Time Sent: {message.sentAt}</p>
                    <p>Room Id: {message.roomId}</p>
                </li>
            );

        return (
            <div>
                <div>
                    <ul>{messageList}</ul>
                </div>
                <div>
                    {messageBar}
                </div>
            </div>
        );
    }
}

export default MessageList;

