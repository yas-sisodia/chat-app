const socket = io();
//socket local host ki jagah :127.0.0.1
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
var audio = new Audio('./music/ting.mp3')

form.addEventListener('submit',(e)=>{

    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value ='';

})


const Name = prompt("Enter your name to join");


socket.emit('new-user-joined', Name);

 const  append =  (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
    
}

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`,'left')
    
})
socket.on('left', name =>{
    append(`${name} left the chat`,'right')
})


