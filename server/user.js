const users = []

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const exsitingUser = users.filter((user) => {
    user.room === room && user.name === name
  })

  if (!name || !room) return { error: "Username and room are requierd" }
  if (exsitingUser.length !== 0) return { error: "Username has been taken" }

  const user = { id, name, room }

  users.push(user)

  return { user }
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

const removeUser = (id) => {
  if (id) {
    const index = users.findIndex((user) => user.id === id)
    if (index > -1) return users.splice(index, 1)[0]
  } else {
    return null
  }
}

const checkUser = ({ name, room }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()
  const existingUser = users.find(
    (user) => user.room === room && user.name === name,
  )
  if (existingUser) {
    return false
  } else {
    return true
  }
}



module.exports = { users, addUser, getUsersInRoom, removeUser, checkUser }