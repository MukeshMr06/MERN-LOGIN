import { User } from '../model/user.js';
import {resend} from './config.js'
import { verificationTokenEmailTemplate, WELCOME_EMAIL_TEMPLATE } from './emailTemplate.js';

export const sendEmailVerification = async (email,verificationToken)=>{
    try {
     const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Verify Email Address",
    html: verificationTokenEmailTemplate.replace("{verificationToken}", verificationToken),
  });
    } catch (error) {
        console.log("Error while fetching email verification", error)
        throw new Error(`Error sending verification email`)
    }
}

export const sendWelcomeEmail = async (email, name)=>{
    try {
     const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Welcome to our platform",
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
  });
    } catch (error) {
        console.log("Error while fetching email sendWelcomeEmail0", error)
        
    }
}

export const sendPasswordResetEmail = async (email, resetURL)=> {
   try {
     const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Welcome to our platform",
    html: `click <a href = ${resetURL}"> here </a> reset your password `,
  });
    } catch (error) {
        console.log("Error while fetching email sendPasswordResetEmail", error)
        
    }
}

export const sendResetSuccessEmail = async (email)=>{
      try {
     const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Password Reset Successfully",
    html: `click <a href = ${resetURL}"> here </a> reset your password `,
  });
    } catch (error) {
        console.log("Error while fetching email sendPasswordResetEmail", error)
        
    }
}
