const Router = require('koa-router');
let router = new Router();
router.get('/',async(ctx)=>{
    ctx.body = '首页'
});
router.post('/register',async(ctx)=>{
    console.log('测试结果')
    ctx.body= ctx.request.body;
})

module.exports = router;