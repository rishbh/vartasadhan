
const socket=io();
let textarea=document.querySelector("#textarea");
let messageArea=document.querySelector('.message_area')
let name;
do{
    name=prompt('Please enter your name');
}while(!name)
alert('Now you can chat')
textarea.addEventListener('keyup',(e)=>{
    if(e.key=="Enter"){
        sendMessage(e.target.value);
    }
});

function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }


    //Appending the message
    appendMessage(msg,'outgoing');
     textarea.value=''

    //Send to the server
    socket.emit('message',msg)




}


function appendMessage(msg,type){

    let mainDiv=document.createElement('div')
    let classname=type;//outgoing ya incoming

    mainDiv.classList.add(classname,'message')

    //generate markup
    let markup=`
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>


    `
       mainDiv.innerHTML=markup;
       messageArea.appendChild(mainDiv);
}


//Receive message s
socket.on('message',(msg)=>{
    //open on other browser
    appendMessage(msg,'incoming');
    
  
})



//scrollto bottomNavigationActionClasses


function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}
