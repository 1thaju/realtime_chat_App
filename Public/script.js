const socket = io()
const clients = document.getElementById("clients-total")

const nameInput = document.getElementById('username')
const messagecontainer = document.getElementById('messagecontainer')
const messageForm = document.getElementById('send-message')
const messageInput = document.getElementById('input-message')
const feedback = document.getElementById('feedback')

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
})


socket.on('clients-total',(data)=>{
    console.log(data)
    clients.innerText = `Total Client : ${data}`
})


function sendMessage(){
    if(messageInput.value === ''){
        alert("type something...")
        return
    }
    //console.log('input is',messageInput.value)
    const messageData = {
        name : nameInput.value,
        message : messageInput.value,
        dateTime : new Date()
    }
    socket.emit('message',messageData)
    addmessage(true,messageData)
    messageInput.value = ''
}
socket.on('chatmessage',(data=>{
    //console.log(data)
    addmessage(false,data)
}))
function addmessage(own,messageData){
    const element = `<li class="${own ? "rightmessage" : "leftmessage"}">
                        <p class="message">
                            ${messageData.message}
                            <p class="address">${messageData.name} | ${messageData.dateTime}</p>
                        </p>
                    </li>`

    messagecontainer.innerHTML += element
    scrolltoBottom()
}

function scrolltoBottom(){
    messagecontainer.scrollTo(0,messagecontainer.scrollHeight)
}

