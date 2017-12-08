const io = require('./index.js').io;

const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events');


const { createUser, createMessage, createChat } = require('../Factories');

// require('../Factories');


let connectedUsers = { };

module.exports = function(socket) {
    
    console.log("Socket Id:" + socket.id);

    //verify username
    socket.on(VERIFY_USER, function(nickname, callback){

    //    console.log( isUser(connectedUsers, nickname));

        if(!isUser(connectedUsers, nickname)){

          callback({isUser:false, user: createUser({name:nickname})});

        }else{
         
          callback({isUser:true})
    
        }
      });

    //user connected user name
    socket.on(USER_CONNECTED,(user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        io.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    });
    //user disconneceted

    //users logouts
}

function addUser(userList, user){
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    console.log(newList);
    return newList;
}

function removeUser(userList, username){
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

function isUser(userList, username){
    //if username is in the list, returns true, otherwise return false
    return username in userList;
}