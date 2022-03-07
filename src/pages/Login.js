import React from "react"
import PropTypes from "prop-types"
import { useUserDispatch } from "../context/UserContext"
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  createStyles,
  makeStyles,
} from "@material-ui/core"
import axios from 'axios'
const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "35%",
    },
  }),
)

function Login(props) {
  const dispatch = useUserDispatch()
  const classes = useStyle()
  const [user, setuser] = React.useState({ name: "", room: null })
  function inputNameHandler(e) {
    const value = e.target.value
    setuser((state) => ({ ...state, name: value }))
  }

  function inputRoomHandler(e) {
    const value = e.target.value
    setuser((state) => ({ ...state, room: value }))
  }

  async function submitHandler(e){
    e.preventDefault()
    const result = await axios.post("http://localhost:5000/login/", user)
    if(result.data.code === 0){
      dispatch({ type: "login", payload: user })
      props.history.push(`/chat/?name=${user.name}&room=${user.room}`)
    }else{
      console.log('error');
    }
    
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid
          container={true}
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4">Join</Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="filled"
              label="name"
              onChange={(e) => inputNameHandler(e)}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              variant="filled"
              label="room"
              onChange={(e) => inputRoomHandler(e)}
            ></TextField>
          </Grid>
          <Grid item className={classes.button}>
            <Button fullWidth={true} onClick={(e)=>submitHandler(e)}>Join now</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

Login.propTypes = {}

export default Login
