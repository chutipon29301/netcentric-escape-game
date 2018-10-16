/*jshint esversion: 6 */
const BASE_URL = "ws://localhost:3000";
const waitingRoomConnection = document.getElementById("waitingRoomConnection");
const waitingRoomConnectionBtn = document.getElementById("waitingRoomConnectionBtn");
let socket;

function enterWaitingRoom() {
    socket = new WebSocket(`${BASE_URL}/waitingRoom`);
    socket.addEventListener("open", (event) => {
        waitingRoomConnection.innerHTML = "Connected";
        waitingRoomConnectionBtn.onclick = disconnectFromWaitingRoom;
        waitingRoomConnectionBtn.innerHTML = "Disconnect";
    });
    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
    });
    socket.addEventListener("close", (event) => {
        waitingRoomConnection.innerHTML = "Closed";
        waitingRoomConnectionBtn.onclick = enterWaitingRoom;
        waitingRoomConnectionBtn.innerHTML = "Connect";
    });
    socket.addEventListener("error", () => {
        waitingRoomConnection.innerHTML = "Error";
    });
}

function disconnectFromWaitingRoom() {
    socket.close();
}



// Listen for messages


function btnClicked() {
    socket.send("Hello")
}