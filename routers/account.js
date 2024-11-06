import { Router } from 'express';
const router = new Router();

import {
    signup,
    verificationCode,
    verificationEmail,
    login,
    logout
} from '../controller/account.js';

router.route('/signup')
    .post(signup);

router.route('/verification/code/:token')
    .post(verificationCode);

router.route('/verification/email')
    .post(verificationEmail);

router.route('/login')
    .post(login);

router.route('/logout')
    .delete(logout);

export default router