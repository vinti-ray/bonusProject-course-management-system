const courseModel=require("../model/courseModel")
const axios=require("axios")
let {courseJoi}=require("../validation/joiValidation")

//=============create Course=======================
const createCourse=async (req,res)=>{
try {
	    let data=req.body
	
	    let error = 0
	    const validation = await courseJoi.validateAsync(data).then(() => true).catch((err) => { error= err.message; return null })
	
	    if (!validation) return res.status(400).send({ status: false, message: `${error}` })
	
	    const isUrlExist = await axios
	    .get(data.videoUrl)
	    .then(() => data.videoUrl)
	    .catch(() => null);
	
	  if (!isUrlExist) { return res.status(404).send({ status: false, message: "url doesn't exist" })};
	
	    const createData=await courseModel.create(data)
	    return res.send({msg:createData})
} catch (error) {
	return res.status(500).send({ error: error.message });
}
}

//====================update Course================
const updateCourse=async(req,res)=>{
try {
	    let data=req.body
	     
	    if(Object.keys(data).includes("videoUrl")){
	        const isUrlExist = await axios
	        .get(data.videoUrl)
	        .then(() => data.videoUrl)
	        .catch(() => null);
	    
	      if (!isUrlExist) { return res.status(404).send({ status: false, message: "url doesn't exist" })};
	    }
	
	    const findData=await courseModel.findOne({adminId:req.decode.id},{isDeleted:false})
	    if (!findData) { return res.status(404).send({ status: false, message: "no data found" })};
	    console.log(findData);
	    const updateData=await courseModel.updateMany({adminId:req.decode.id},data)
	   return  res.send({data:updateData})
} catch (error) {
	return res.status(500).send({ error: error.message });
}
}


//====================delete course====================
const deleteData=async(req,res)=>{
try {
	    const findData=await courseModel.findOne({adminId:req.decode.id},{isDeleted:false})
	    if (!findData) { return res.status(404).send({ status: false, message: "no data found" })};
	    
	    const deleteData=await courseModel.updateMany({adminId:req.decode.id},{isDeleted:true})
	   return res.status(200).send({msg:"deleted successfully"})
} catch (error) {
	return res.status(500).send({ error: error.message });
}
}


//=========================approve course=================
const approvedCourse=async(req,res)=>{
    
try {
	    const findData=await courseModel.findOne({adminId:req.decode.id},{isDeleted:false})
	    if (!findData) { return res.status(404).send({ status: false, message: "no data found" })};
	
	    const updateData=await courseModel.findOneAndUpdate({adminId:req.decode.id},{isAprovved:true},{new:true})
	
	    res.send({data:updateData})
} catch (error) {
	return res.status(500).send({ error: error.message });
}
}
//=======================get course==================
const getdata= async (req,res)=>{
try {
	    const findData=await courseModel.find({isAprovved:true}).sort({category:1})
	    if(findData.length==0)  { return res.status(404).send({ status: false, message: "no data found" })};
	    return res.send({msg:findData})
} catch (error) {
	return res.status(500).send({ error: error.message });
}

}

//==============export====================================

module.exports.createCourse=createCourse
module.exports.updateCourse=updateCourse
module.exports.deleteData=deleteData
module.exports.approvedCourse=approvedCourse
module.exports.getdata=getdata