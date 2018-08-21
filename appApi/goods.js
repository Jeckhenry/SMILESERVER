const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

let router = new Router();

router.get('/insertAllGoods', async (ctx) => {
    console.log('开始写入！！！');
    fs.readFile('./appApi//data_json/newGoods.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        let count = 0;
        const Goods = mongoose.model('Goods');
        data.map((value, index) => {
            if (value.IMAGE1) {
                let newGoods = new Goods(value);
                newGoods.save().then(() => {
                    count++;
                    console.log('成功' + count)
                })
                    .catch(er => {
                        count++
                        console.log('失败' +count)
                    })
            }
        });
    });
    ctx.body = '开始写入数据'
})

router.get('/insertAllCatogery',async(ctx)=>{
    fs.readFile('./appApi/data_json/category.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        let categoryCount = 0;
        const category = mongoose.model('Category');
        data.RECORDS.map((value,index)=>{
            let categoryInfo = new category(value);
            categoryInfo.save().then(()=>{
                categoryCount++;
                console.log('成功'+categoryCount)
            })
            .catch(err=>{
                console.log(err+'失败')
            })
        })
    })
    ctx.body = 'a开始写入数据'
});
// 获取商品详情信息接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods');
    await Goods.findOne({ID:goodsId}).exec()
    .then(async(result)=>{
        ctx.body = {code:200,msg:result}
    })
    .catch(async(err)=>{
        ctx.body = {code:500,msg:err}
    })
})

//商品子类shcema建立

router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./appApi/data_json/category_sub.json','utf8',(err,data)=>{
        console.log(data)
        data = JSON.parse(data)
        let saveCount = 0 
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功插入'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
            })
        }) 
    })
    ctx.body="开始导入数据"
})

//获取商品大类
router.get('/getCategory',async(ctx)=>{
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body = {code:200,msg:result}
    } catch (error) {
        ctx.body = {code:500,msg:error}
    }
})
//读取小类
router.post('/getCategorySubList',async(ctx)=>{
    try {
        let categoryId = ctx.request.body.categoryId;
        const categorySub = mongoose.model('CategorySub');
        let result = await categorySub.find({MALL_CATEGORY_ID:categoryId}).exec();
        ctx.body = {code:200,msg:result};
    } catch (error) {
        ctx.body = {code:500,msg:error}
    }
})
//根据商品类别获取商品列表
router.post('/getGoodsListbyCategorySubId',async(ctx)=>{
    try{
        let categorySubId = ctx.request.body.categorySubId ; //小类别
        let page = ctx.request.body.page;
        let num = 10; //每页显示数量
        let start = (page-1)*num;
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec();
        ctx.body = {code:200,msg:result};
    }catch(error){
        ctx.body = {code:500,msg:error}
    }
})




module.exports = router;