import React from "react"
import PropTypes from "prop-types"
import { createStyles, makeStyles } from "@material-ui/core"

const useStyle = makeStyles((theme) =>
  createStyles({
    rootL: {
      height: "100%",
      width: "100%",
      display: "flex",
      paddingLeft: "20px;",
      justifyContent:  "flex-start" ,
      alignItems: "baseline",
    },
    rootR: {
      height: "100%",
      width: "100%",
      display: "flex",
      paddingRight: "20px;",
      justifyContent:  "flex-end",
      alignItems: "baseline",
    },
    messageContainer: {
      borderRadius: "10px",
      backgroundColor: theme.palette.action.hover,
      padding: "15px",
      textAlign: "center",
    },
    userName: {
      padding: "5px",
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }),
)


function Message({content, userName, direction}) {
  
  const classes = useStyle()
  return (
    <div className={direction === 'LTR'?classes.rootL :classes.rootR}>
      {direction === "LTR" ? (
        <>
          <div className={classes.messageContainer}>{content}</div>
          <div className={classes.userName}>{userName}</div>
        </>
      ) : (
        <>
          <div className={classes.userName}>{userName}</div>
          <div className={classes.messageContainer}>{content}</div>
        </>
      )}
    </div>
  )
}

Message.propTypes = {
  content: PropTypes.string,
  userName: PropTypes.string,
  direction: PropTypes.string,
}

export default Message
