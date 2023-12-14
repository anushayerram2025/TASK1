const mongoose=require('mongoose');


const uri="mongodb+srv://yerramanusha8:EeMQuSTY6x8voQoS@cluster0.ugfai6v.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri);
const userSchema=mongoose.Schema({
    Name:String,
    Username:String,
    password:String,
    phone_no:String,
    soft_delete:{type: Boolean, default: false},
    role:{type:String,default:'user'}
});

const Model =mongoose.model('Model',userSchema);

module.exports=Model; 



