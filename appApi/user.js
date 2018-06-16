const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();
router.get('/',async(ctx)=>{
    ctx.body = '首页'
});
router.post('/register',async(ctx)=>{
    // console.log(ctx.request.body)
    // ctx.body= ctx.request.body;
    const USER = mongoose.model('User');
    let newUser = new USER(ctx.request.body);

    await newUser.save().then(()=>{
        ctx.body = {
            code:200,
            msg:'success save'
        }
    }).catch(error=>{
        ctx.body = {
            code:500,
            msg:error
        }
    })

})

module.exports = router;