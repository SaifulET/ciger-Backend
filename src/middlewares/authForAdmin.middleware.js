import { TokenDecodeForAdmin} from "../utils/tokenUtility.js";
export const authChecks=async (req,res,next)=>{
console.log("lkdk")
  console.log('4',req.cookies,"4")
  const token= req.cookies.token;
    const authHeader = req.headers.authorization; 

    console.log(authHeader)
    console.log(token)
  // if (!authHeader && !authHeader.startsWith("Bearer ") && !tokens) {
  //   return res.status(401).json({ message: "No token provided" });
  // }


console.log(token,"15")
 let decoded=TokenDecodeForAdmin(token);

    if(decoded===null){
      console.log(decoded,"hellow")
        res.status(401).json({status:"fail",Message:"Unauthorized",token:token});
    }
    else{
      console.log("23")
        let user_id=decoded.id;
        req.headers.user_id=user_id;
        next();
    }
}