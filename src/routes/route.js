const express=require("express")
const router=express.Router()
const employeeController=require("../controller/admincontroller")
const courseController=require("../controller/courseController")
const auth=require("../middleware/auth")

router.post("/createEmployee",employeeController.createEmployee)
router.post("/login",employeeController.logIn)

router.post("/createcourse",auth.authentication,auth.authforAdmin,courseController.createCourse)
router.put("/updateCourse",auth.authentication,auth.authforAdmin,courseController.updateCourse)
router.delete("/deleteData",auth.authentication,auth.authforAdmin,courseController.deleteData)

router.put("/approvedCourse/:courseId",auth.authentication,auth.authSuperAdmin,courseController.approvedCourse)
router.get("/getData",auth.authentication,courseController.getdata)



module.exports=router






