const jwt = require("jsonwebtoken");


const authentication = async function (req, res, next) {
  try {
    let token = req.headers["auth"];
    if (!token) return res.status(401).send({ message: "token not present" });

    jwt.verify(token, "dangerous-secret-key", (err,decode) => {
      if (err) {return res.status(401).send({ err: err.message })
	}else{
		req.decode = decode;
    console.log(req.decode);
 
		return next(); 
	};
    });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const authforAdmin=async function(req,res,next){
  try {

    if(req.decode.role!="Admin") return res.status(400).send({message:"you are not authorised"})

    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}




const authSuperAdmin=async (req,res,next)=>{
  try {
  if(req.decode.role!="Super Admin") return res.status(400).send({message:"you are not authorised"})

  next();
} catch (error) {
  return res.status(500).send({ error: error.message });
}
}
module.exports={authentication,authforAdmin,authSuperAdmin}