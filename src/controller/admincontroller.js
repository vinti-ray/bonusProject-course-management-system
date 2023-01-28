const employeeModel=require("../model/employeeModel")

var passwordHash = require('password-hash');

let {userJoi,loginJoi}=require("../validation/joiValidation")


const jwt = require("jsonwebtoken");
// var passwordHash = require('./lib/password-hash');

//============================create employee======================================

const createEmployee=async(req,res)=>{
try {
	    data=req.body
	    let error = 0
	    const validation = await userJoi.validateAsync(data).then(() => true).catch((err) => { error= err.message; return null })
	
	    if (!validation) return res.status(400).send({ status: false, message: `${error}` })
	
	    const findInDb=await employeeModel.findOne({email:data.email})
	    if(findInDb)  return res.status(400).send({msg:"email already exist"})
	
	    var hashedPassword = passwordHash.generate(data.password);
	
	
	    data.password=hashedPassword
	
	    const createData=await employeeModel.create(data)
	
	   return res.status(201).send({msg:createData})
} catch (error) {
	return res.status(500).send({ error: error.message });
}
}

//==================================login=========================================
const logIn=async(req,res)=>{
 try {
	   data=req.body
	
	    let error = 0
	    const validation = await loginJoi.validateAsync(data).then(() => true).catch((err) => { error= err.message; return null })
	
	    if (!validation) return res.status(400).send({ status: false, message: `${error}` })
	
	    const findInDb=await employeeModel.findOne({email:data.email})
	
	   if(!findInDb) return res.status(400).send({msg:"no data found"})
	
	
	       let passwordFromDb=findInDb.password
	       let passwordFromBody=data.password
	
	
	    let verifyPassword=  passwordHash.verify(passwordFromBody, passwordFromDb)
	
	    console.log(verifyPassword);
	
	    if(!verifyPassword)   return res.send("password is incorrect")
	
	    let token=jwt.sign({id:findInDb._id,role:findInDb.role},"dangerous-secret-key")
	
	      return res.send({msg:token})
	
} catch (error) {
	return res.status(500).send({ error: error.message });
}

}


module.exports={createEmployee,logIn}