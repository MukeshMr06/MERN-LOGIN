import express from 'express'
import { forgotPassword, login, logout, signUp, verifyEmail, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);

router.post('/verify-email', verifyEmail);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);


export default router
