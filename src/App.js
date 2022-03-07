import React from "react"
import { Route, BrowserRouter } from "react-router-dom"
import { ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core"
import Login from "./pages/Login"
import ChatRoom from "./pages/ChatRoom"
import { UserProvider } from "./context/UserContext"
const themeDrak = () =>
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#a6d4fa",
      },
      secondary: {
        main: "#f6a5c0",
      },
    },
  })
const themeLight = () =>
  createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
    },
  })




function App() {
 
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeLight()}>
        <CssBaseline />
        <UserProvider>
          <Route path="/" exact component={Login}></Route>
          <Route path="/chat/" component={ChatRoom}></Route>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
