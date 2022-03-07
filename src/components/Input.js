import React,{useRef} from "react"
import PropTypes from "prop-types"
import { Button, TextField, createStyles, makeStyles ,CssBaseline, useTheme } from "@material-ui/core"

const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.light,
    },
    inputHeight: {
      height: "100%",
      borderRadius: "0px 0px 0px 10px",
    },
    button: {
      width: "70px",
      color: theme.palette.primary.light,
    },
    buttonHeight: {
      height: "100%",
      borderRadius: "0px 0px 10px 0px",
    },
  }),
)



function Input({ clickCallback, onInput }) {
  const classes = useStyle()
  const ref = useRef(null)
  const clickHandler = ()=>{
    clickCallback()
    ref.current.value = ''
  }

  return (
    <div className={classes.root}>
      <TextField
        label="Type a message"
        variant="filled"
        fullWidth={true}
        onChange={(e) => onInput(e)}
        InputProps={{ classes: { root: classes.inputHeight } }}
       inputRef={ref}
      ></TextField>
      <div className={classes.button}>
        <Button
          color="primary"
          variant="contained"
          fullWidth={true}
          classes={{ root: classes.buttonHeight }}
          onClick={() => clickHandler()}
        >
          Send
        </Button>
      </div>
    </div>
  )
}

Input.propTypes = {
  clickCallback: PropTypes.func,
  onInput:PropTypes.func
}

export default Input
