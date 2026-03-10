import jwt from 'jsonwebtoken'

export const generateJWTToken  = (res, userId)=>{
    const token = jwt.sign({userId :userId}, process.env.JWT_SECRET, {
        expiresIn:'1d'
    })

    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite : 'strict',
    maxAge: 10 * 60 * 1000
})
 
  return token
}
