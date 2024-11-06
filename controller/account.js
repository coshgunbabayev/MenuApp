import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Eatery from '../models/eatery.js';

import {
    verificationToken,
    loginToken
} from '../tools/token.js';

import {
    sendEmailForVerification
} from '../smtp/send.js'

import { createCode } from '../tools/random.js';

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        let hashedPassword = '';
        if (password && password.length > 7) {
            hashedPassword = await bcrypt.hash(password, 10);
        };

        const eatery = await Eatery.create({
            name,
            email,
            password: hashedPassword
        });

        const token = verificationToken(eatery._id);
        await sendEmailForVerification(eatery.email, eatery.verification.code, token);

        res.status(201).json({});
    } catch (err) {
        let errors = new Object();

        if (err.name === "ValidationError") {
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
        };

        if (err.name === "MongoServerError" && err.code === 11000) {
            if (err.keyPattern.email) {
                errors.email = 'Email is used, try other email';
            };
        };

        res.status(400).json({
            errors
        });
    };
};

async function verificationCode(req, res) {
    const { token } = req.params;
    const { code } = req.body;

    if (!token) {
        return res.status(400).json({
            message: 'TokenError'
        });
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_VERIFICATION);
    } catch (err) {
        return res.status(400).json({
            message: 'TokenError'
        });
    };

    const eatery = await Eatery.findById(decoded.id);

    if (!eatery) {
        return res.status(400).json({
            message: 'TokenError'
        });
    };

    if (eatery.verification.status) {
        return res.status(400).json({
            message: 'EateryVerified'
        });
    };

    if (!code) {
        return res.status(400).json({
            errors: {
                code: 'Please enter a verification code'
            }
        });
    };

    if (eatery.verification.code !== code) {
        eatery = await eatery.resetVerificationCode();
        await sendEmailForVerification(eatery.email, eatery.verification.code);

        return res.status(400).json({
            errors: {
                code: 'Verification code is incorrect, we send a new code'
            }
        });
    };

    await eatery.verified();

    res.status(200).json({});
};

async function verificationEmail(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            errors: {
                email: 'Please enter an email address'
            }
        });
    };

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            errors: {
                email: 'Please enter a valid email address'
            }
        });
    };

    const eatery = await Eatery.findOne({ email });

    if (!account) {
        return res.status(404).json({
            errors: {
                email: 'Account not found with this email address'
            }
        });
    };

    if (account.verification.status) {
        return res.status(400).json({
            message: 'EateryVerified'
        });
    };

    const token = verificationToken(eatery._id);
    await sendEmailForVerification(eatery.email, eatery.verification.code, token);

    res.status(200).json({});
};

async function login(req, res) {

};

async function logout(req, res) {

};

export {
    signup,
    verificationCode,
    verificationEmail,
    login,
    logout
}
