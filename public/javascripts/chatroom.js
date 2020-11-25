const socket = io.connect("http://localhost:8080");
const username = document.querySelector('#username');
// const usernameBtn = document.querySelector('#usernameBtn');
const chat = JSON.parse(sessionStorage.getItem("chat"));

var element = document.getElementsByClassName("message-box-box");
element.scrollTop = element.scrollHeight ;



(function() {
    
    const username = document.querySelector('#username');
    let message = document.querySelector('#message');
    let messageBtn = document.querySelector('#messageBtn');
    let messageList = document.querySelector('#message-list');
    const orderId = document.querySelector('#orderId').value;


    messageBtn.addEventListener('click', e => {
        console.log("On submit")

        let listItem = document.createElement('li')
        listItem.textContent = message.value;
        listItem.classList.add('list-group-item');
        listItem.style.textAlign = "right";
        messageList.appendChild(listItem)

        socket.emit(orderId, { message: message.value })
        message.value = ''
    })
    socket.on('connect', () => {
        console.log('successfully to server')
    })

    socket.on(orderId, data => {
        console.log(`on client from server ${orderId}  =>  ${data.message} - by ${data.username}`)

        let listItem = document.createElement('li')
        listItem.textContent = data.username + ": " + data.message;
        if (data.username != username.value) {
            listItem.style.textAlign = "left";
        }
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