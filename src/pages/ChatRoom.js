import React,{useState,useEffect} from "react"
import PropTypes from "prop-types"
import queryString from 'query-string'
import { createStyles, makeStyles, Divider } from "@material-ui/core"
import InfoBar from "../components/InfoBar"
import TextContainer from "../components/TextContainer"
import Input from '../components/Input';
import { useUserState } from "../context/UserContext"
import io from "socket.io-client"


const useStyle = makeStyles((theme) =>
  createStyles({
    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "60vh",
      width: "60vw",
      borderRadius: "20px",
    },
    bar: {
      flex: 1,
      width: "100%",
    },
    text: {
      flex: 6,
      width: "100%",
      overflowY:'scroll',
    },
    input: {
      flex: 1,
      width: "100%",
    },
  }),
)
const server = 'http://localhost:5000/'
let socket

function ChatRoom(props) {
  const classes = useStyle()
   const [name, setName] = useState("")
   const [room, setRoom] = useState("")
  // const userState = useUserState()

  //infobar


  //textContainer
  const [messages, setMessages] = useState([])

  // input
  const [inputmessage, setinputmessage] = useState("")
  const inputHandler =(e) => {
      const value = e.target.value
      setinputmessage(value)
    }
  const sendHandler = () => {
    setMessages((messages) => [...messages, {user:name,text:inputmessage}])
    console.log({ user: name, room: room, text: inputmessage })
    socket.emit("sendMessage", { name: name, room:room, message: inputmessage })
    setinputmessage("")
  }



  useEffect(() => {
    const { room, name } = queryString.parse(props.location.search)
    setRoom(room)
    setName(name)
    socket = io(server)
    socket.emit("join", { name, room }, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }, [server, props.location.search])

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message])
    })
  }, [])

  return (
    <div className={classes.page}>
      <div className={classes.root}>
        <div className={classes.bar}>
          <InfoBar title={Number(room)}></InfoBar>
        </div>
        <div className={classes.text}>
          <TextContainer messages={messages} userName={name}></TextContainer>
        </div>
        <Divider />
        <div className={classes.input}>
          <Input clickCallback={sendHandler} onInput={inputHandler}></Input>
        </div>
      </div>
    </div>
  )
}

ChatRoom.propTypes = {}

export default ChatRoom
