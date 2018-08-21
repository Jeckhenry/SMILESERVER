const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const catogerySchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_NAME:String,
    IMAGE:String,
    TYPE:Number,
    SORT:Number,
    COMMENTS:String
},{
    collections: 'Category'
});

mongoose.model('Category',catogerySchema);