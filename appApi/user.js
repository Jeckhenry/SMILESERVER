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

});

/*登录的实践 */
router.post('/login',async(ctx)=>{
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.UserName
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码
   await User.findOne({UserName:userName}).exec().then(async(result)=>{
        console.log('查到的信息',result)
        if(result){
           //console.log(User)
            //当用户名存在时，开始比对密码
            let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
            await newUser.comparePassword(password,result.password)
            .then( (isMatch)=>{
                //返回比对结果
                console.log(isMatch)
                ctx.body={ code:200, msg:isMatch} 
            })
            .catch(error=>{
                //出现异常，返回异常
                console.log(error)
                ctx.body={ code:500, msg:error}
            })
        }else{
            ctx.body={ code:200, msg:'用户名不存在'}
        }
        
    }).catch(error=>{
        console.log(error)
        ctx.body={ code:500, msg:error  }
    })
})


module.exports = router;