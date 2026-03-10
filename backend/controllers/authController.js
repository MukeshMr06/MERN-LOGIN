import {User} from '../model/user.js'
import bcrypt from 'bcryptjs'
import { generateJWTToken } from '../utils/generateJWTToken.js'
import { generateVerificationToken } from '../utils/generateVerificationToken.js'
import { sendEmailVerification, sendPasswordResetEmail, sendWelcomeEmail } from '../resend/email.js'
import crypto from 'crypto'

export const signUp = async (req,res)=>{
   const {name, email, password} = req.body
   try {
      if(!name || !email || !password){
    return res.status(400).json({status:"error", message:"All fields are required"})
   }
   const userAlreadyExists = await User.findOne({email});
   if(userAlreadyExists){
    return res.status(400).json({status:"error", message:"Email Already exists"})
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const verificationToken = generateVerificationToken();

   const user = new User({
    name, email, password:hashedPassword, verificationToken, verificationTokenExpiresAt: Date.now() + 10  * 60 * 1000
   })

   await user.save();

   generateJWTToken(res, user._id);

   await sendEmailVerification(user.email, verificationToken)

   res.status(200).json({
    status:"success", message:"User created successfully",
    data:{
        ...user._doc, 
        password: undefined
    }
   })

   } catch (error) {
    return res.status(400).json({status:'error', message: error.message})
   }

}

export const verifyEmail = async (req,res)=>{
   const {code} = req.body;
   try {
      const user = await User.findOne({
         verificationToken : code,
         verificationTokenExpiresAt : {$gt: Date.now()}
      })
      if(!user){
         return res.status(400).json({status: 'error', message:"Invalid or Expires"})
      }
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
    
      await user.save()
      await sendWelcomeEmail(user.email, user.name)

      res.status(200).json({status: "success", message:"Email verified successfully"})

   } catch (error) {
      console.log("Error while fetching email", error)
      return res.status(400).json({status:"error", message:error.message})
   }
}

export const login = async(req,res)=>{
   
   const {email,password} = req.body;

   try {
      const user = await User.findOne({email})
      if(!user){
         return res.status(400).json({status:"error", messaage:"Invalid credentials"});
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
         return res.status(400).json({status:"error", message:"Ivalid credential"})
      }

      const isVerified = user.isVerified;
      if(!isVerified){
         return res.status(400).json({status:"error", message:"Email not verified"})
      }


      generateJWTToken(res,user._id);
      return res.status(200).json({status:"success", message:"Login successfully"})

   } catch (error) {
      console.log("Error while login",error)
      return res.status(500).json({status:"error", message: error.message})
   }
}

export const logout = async (req,res)=>{
   res.clearCookie("token")
   return res.status(200).json({status:"success", message:"Loggout successfully"})
} 

export const forgotPassword = async (req,res)=>{

   const {email} = req.body

   try {
      const user = await User.findOne({email});

      if(!user){
         return res.status(400).json({status:"error", message:"User not found"});
      }
      const resetPasswordToken = crypto.randomBytes(32).toString("hex");
      const resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000

      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpiresAt = resetPasswordExpiresAt;

      await user.save();
      await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

      res.status(200).json({status:"success", messaage:"Password reset email send successfully"})
   } catch (error) {
      console.log("Error while fetching Forgot password")
      return res.status(400).json({status:"error", message: error.message})
   }
}