import React from "react"
import PropTypes from "prop-types"
import { createStyles, Link, makeStyles } from "@material-ui/core"
import {Close, FiberManualRecord} from "@material-ui/icons"
import { green } from "@material-ui/core/colors"
const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.palette.primary.light,
      borderTopRightRadius: " 10px",
      borderTopLeftRadius: "10px",
    },
    left: {
      display:'flex',
      alignItems:'center',
      marginLeft: "8px",
    },
    right: {
      marginRight: "8px",
    },
  }),
)

function InfoBar({ title }) {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <FiberManualRecord
          size="small"
          style={{ color: green[500] }}
        ></FiberManualRecord>
        <h3>{title}</h3>
      </div>

      <div className={classes.right}>
        <Link href="/">
          <Close color="action"></Close>
        </Link>
      </div>
    </div>
  )
}

InfoBar.propTypes = {
  title: PropTypes.number,
}

export default InfoBar
