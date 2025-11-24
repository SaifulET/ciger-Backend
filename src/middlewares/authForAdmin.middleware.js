import { TokenDecodeForAdmin} from "../utils/tokenUtility.js";
export const authChecks=async (req,res,next)=>{
console.log("lkdk")
  console.log('4',res.cookies,"4")
  const token= req.cookies.token;
    const authHeader = req.headers.authorization; 

    console.log(authHeader)
    console.log(token)
  // if (!authHeader && !authHeader.startsWith("Bearer ") && !tokens) {
  //   return res.status(401).json({ message: "No token provided" });
  // }



 let decoded=TokenDecodeForAdmin(token);

    if(decoded===null){
        res.status(401).json({status:"fail",Message:"Unauthorized",token:token});
    }
    else{
        let user_id=decoded.id;
        req.headers.user_id=user_id;
        next();
    }
}