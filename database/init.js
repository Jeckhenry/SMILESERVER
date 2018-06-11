
const mongoose = require('mongoose')
const glob = require('glob')
const {resolve} = require('path')
const db = "mongodb://localhost/simle-db"

mongoose.Promise = global.Promise

exports.initSchema = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = () => {
    //连接数据库
    mongoose.connect(db)
    let maxtimes = 0;
    return new Promise((resolve, reject) => {
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected', () => {
            //进行重连
            if(maxtimes<=3){
                maxtimes++;
                mongoose.connect(db)
            }else{
                reject();
                throw new Error('数据库问题，程序无法处理')
            }
            
        })

        //数据库出现错误的时候
        mongoose.connection.on('error', err => {
            console.log(err)
            if(maxtimes<=3){
                maxtimes++;
                mongoose.connect(db)
            }else{
                reject();
                throw new Error('数据库问题，程序无法处理')
            }
        })

        //链接打开的时候
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected successfully!')
            resolve();
        })
    })



}
