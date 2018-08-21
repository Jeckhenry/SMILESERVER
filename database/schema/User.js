const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//创建schema
const UserSchema = new Schema({
    UserId: ObjectId,//{type:ObjectId}
    UserName:{unique:true,type:String},
    password:{type:String},
    creatAt: {type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},{
    collection:'user'
});
//加盐(密码加密)
UserSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err)
        return next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err)
            return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods = {
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,iswatch)=>{
                if(!err) resolve(iswatch);
                else reject(err);
            })
        })
    }
}

//发布
mongoose.model('User',UserSchema);