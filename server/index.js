const koa = require("koa")
const App = new koa()
const server = require("http").createServer(App.callback())
const socketio = require("socket.io")
const io = socketio(server)

const cors = require('koa2-cors')
App.use(cors())

const bodyParser = require('koa-bodyparser')
App.use(bodyParser())


// io.set("origins", "http://localhost:3000")
const { addUser, removeUser, getUser, getUsersInRoom } = require("./user")
const userRouter = require('./router')
App.use(userRouter.routes())


io.on("connection", (socket) => {
  console.log('socket connected');
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)

    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to room ${user.room}`,
    })
    socket.broadcast
      .to(user.room)
      .emit("message", { user: `admin`, text: `${user.name} has joined` })

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  socket.on("sendMessage", ({ name, room, message }, callback) => {
    console.log("server received msg");
    try {
      socket.broadcast.to(room).emit("message", { user: name, text: message })
    } catch (error) {
      callback(error)
    }
  })

  socket.on("disconnect", () => {
    console.log('socket disconnected');
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      })
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
})

server.listen(process.env.PORT || 5000, () =>
  console.log("server is running on port 5000"),
)