import { Router } from 'express';
const router = new Router();

import {
    authenticateForPage
} from '../middlewares/auth.js';

import {
    getIndexPage,
    getSignUpPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getLoginPage,
    getCreatePage,
    getMenuPage
} from '../controller/page.js';

router.route('/')
    .get(getIndexPage);

router.route('/signup')
    .get(getSignUpPage);

router.route('/verification/code/:token')
    .get(getVerificationCodePage);

router.route('/verification/email')
    .get(getVerificationEmailPage);

router.route('/login')
    .get(getLoginPage);

router.route('/create')
    .get(authenticateForPage, getCreatePage);

router.route('/menu/:id')
    .get(getMenuPage);

export default router