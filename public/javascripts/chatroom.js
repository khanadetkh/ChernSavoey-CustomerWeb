const { Timestamp } = require("mongodb");

const socket = io.connect("http://localhost:8080");


(function() {
    let username = document.querySelector('#username');
    let usernameBtn = document.querySelector('#usernameBtn');
    let curUsername = document.querySelector('.card-header');

    usernameBtn.addEventListener('click', e => {
        console.log(username.value);
        socket.emit('change_username', { username: username.value })
        curUsername.textContent = username.value
        username.value = ''
    })

    let message = document.querySelector('#message');
    let messageBtn = document.querySelector('#messageBtn');
    let messageList = document.querySelector('#message-list');

    messageBtn.addEventListener('click', e => {
        console.log(message.value)
        socket.emit('new_message', { message: message.value })
        message.value = ''
    })
    socket.on('connect', () => {
        console.log('successfully to server')
    })

    socket.on('receive_message', data => {
        console.log('from server ' + data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ": " + data.message;
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem)
    })

    let info = document.querySelector('.info');

    message.addEventListener('keypress', e => {
        socket.emit('typing')
    })

    socket.on('typing', data => {
        info.textContent = data.username + " is typing..."
        setTimeout(() => { info.textContent = '' }, 5000)
    })
})();

function  sendMsg() {
    const receiveId = '1';
    const senderId = '2';
    const message = document.getElementById("message").value;
    console.log("message : " + message)
    const orderId = "lxWWau90ExO2Xsijk71T";
    const response = fetch(
        `/orderList/${orderId}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderId, receiveId, senderId, message })
        }
    );
}