const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
//引入connect
const {connect,initSchema} = require('./database/init.js')
const mongoose = require('mongoose');
const Router = require('koa-router');
let user = require('./appApi/user.js');
let home = require('./appApi/home.js');
//装在所有子路由
let router = new Router();
router.use('/user',user.routes());
router.use('/home',home.routes());

//加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());
app.use(cors());

//立即执行函数
;(async () =>{
    await connect()
    initSchema()
    const User = mongoose.model('User')
    let oneUser = new User({UserName:"lxxqqq",password:"123456"})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
    let user = await User.findOne({}).exec();
    console.log('数据查到了')
    console.log(user)
})()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello</h1>';
})

app.listen(3000,()=>{
    console.log('server starting at port 3000');
})

