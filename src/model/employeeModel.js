const { default: mongoose } = require("mongoose")


const employeeModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Employee"
    }
},{timestamps:true})

module.exports=mongoose.model("employee",employeeModel)








//name, email, password (encrypted), role )
// By default, Employee
