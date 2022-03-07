import React from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles, Container, Grid } from "@material-ui/core"
import  Message  from "./Message/index";
const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    gridContainer: {
      height: "100%",
      width: "100%",
      padding: '20px'
    },
    gridContainer:{
      overflow: 'auto',
    }
  }),
)
const TextContainer = ({messages,userName}) => {
    const classes = useStyle()
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          // classes={{ container: classes.gridContainer}}
          spacing={2}
          className={classes.gridContainer}
        >
          {messages.map((message, index) => (
            <Grid item key={index}>
              <Message
                userName={message.user}
                content={message.text}
                direction={message.user === userName ? "RTL" : "LTR"}
              ></Message>
            </Grid>
          ))}
        </Grid>
      </div>
    )
}

TextContainer.propTypes = {

}

export default TextContainer
