import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "Guest", content: "", sentAt: "", RoomId:"", messages:[] };
        this.handleChange = this.handleChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.messageRef = this.props.firebase.database().ref("messages/" + this.props.activeRoom);  
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
          content: e.target.value,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
      }

      createMessage(e){
        e.preventDefault();
         this.messageRef.push({
          username: this.state.username,
          content: this.state.content,
          sentAt: this.state.sentAt,
          RoomId: this.state.RoomId
        });
        this.setState({ username: "", content: "", sentAt: "",RoomId:""});
       }

    //   createMessage(e) {
    //     e.preventDefault();
    //       this.messagesRef.push({
    //         username: this.state.username,
    //         content: this.state.content,
    //         sentAt: this.state.sentAt,
    //         roomId: this.state.roomId
    //       });
    //       this.setState({ username: "", content: "", sentAt: "",RoomId:""});
    //   }

    // componentDidMount() {
    //     this.messagesRef.on('value', snapshot => {
    //         const newMessages = [];
    //         snapshot.forEach((message) => {
    //             newMessages.push({
    //                 id: message.key,
    //                 username: message.val().username,
    //                 content: message.val().content,
    //                 sentAt: message.val().sentAt,
    //                 roomId: message.key
    //             });
    //             console.log(newMessages);
    //         });
    //         this.setState({messages: newMessages});
    //     });
    //   }

    componentDidMount() {
        this.messageRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat(message) })
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

