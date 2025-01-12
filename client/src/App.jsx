import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message: message, room: room });
    // socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    console.log(`useEffect: ready to receive message on room ${room}`);
    socket.on("receive_message", (data) => {
      setMessageReceived(`${data.room}:: ${data.message}`);
    });
  });

  return (
    <div className='App'>
      <input
        placeholder='Room Number...'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder='Message...'
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
