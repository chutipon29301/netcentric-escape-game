/*jshint esversion: 6 */
const socket = new WebSocket("ws://localhost:3000/waitingRoom");


socket.addEventListener('open', function (event) {
    console.log("Connection Open");
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});


function btnClicked() {
    socket.send("Hello")
}