import React from 'react'

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

function userReducer(state,action){
    switch(action.type){
        case 'login':{
            const {name,room} = action.payload
            return {...state,name:name,room:room}
        }
        default:{
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}


function UserProvider({children}) {
    const [state,dispatch] = React.useReducer(userReducer,{name:'',room:''})
    return (
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}>
          {children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    )
}

function useUserDispatch() {
    const context = React.useContext(UserDispatchContext)
    if(context ===undefined){
        throw new Error('useUserDispatch must be used within a userDispatchProvider')
    }
    return context
}

function useUserState() {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error("useUserState must be used within a userStateProvider")
  }
  return context
}


export {UserProvider, useUserDispatch, useUserState}
