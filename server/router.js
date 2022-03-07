
const Router = require('koa-router')
const User = require('./user')
const {
  checkUser,
} = require("./user")
const router = new Router()


router.get('/',async(ctx)=>{
    ctx.body = {
      code: 0,
      message: "Server is up and running.",
    }
})

router.post('/login',async(ctx)=>{
    const {name, room}  = ctx.request.body
    if(name && room){
        if(checkUser({name,room}))
      return   ctx.body={
            code:0,
            message: 'login successed'
        }
    }else{
      return   ctx.body = {
          code: 1,
          message: "Username is taken",
        }
    }
})

module.exports = router 