// // Node server which will handle socket I/O connections
// // const io=require('socket.io')(9000);
// const cors=require("cors");
// console.log("hi")
// const io = require('socket.io')(9000, {
//     cors: {
//         origin: "http://localhost",
//         methods: ["GET", "POST"],
//         credentials: true,
//         transports: ['websocket', 'polling'],
// },
// allowEIO3: true
//   });
// io.use(cors());
// const users={};
// io.on('connection', socket =>{
//     socket.on('new-user-joined', name=>{
//         console.log("hi")
//         console.log("New user", name);
//         users[socket.id]=name; 
//         socket.brodcast.emit('user-joined', name);
//     });
//     socket.on('send', message=>{
//         socket.brodcast.emit('recieve', {message:message, name:user[socket.id]}) //user-->users
//     });
// })

const io = require('socket.io')(9000, {
    cors: {
      origin: '*',
    }
  });
const users = {};

 io.on('connection', socket=>{
     socket.on('new-user-joined', name=>{
         console.log("New user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
 })