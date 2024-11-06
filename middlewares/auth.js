import jwt from 'jsonwebtoken';

import Eatery from '../models/eatery.js';

async function authenticateForApi(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Eatery not authenticated'
        });
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Eatery not authenticated'
        });
    };

    let eatery;
    try {
        eatery = await Eatery.findById(decoded.eateryId);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Eatery not authenticated'
        });
    }

    if (!eatery) {
        return res.status(400).json({
            success: false,
            message: 'Eatery not authenticated'
        });
    };

    req.eatery = eatery;
    next();
};

async function authenticateForPage(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.redirect('/login');
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.redirect('/login');
    };

    let eatery;
    try {
        eatery = await Eatery.findById(decoded.eateryId);
    } catch (err) {
        return res.redirect('/login');
    }

    if (!eatery) {
        return res.redirect('/login');
    };

    res.locals.eatery = eatery;
    next();
};

export {
    authenticateForApi,
    authenticateForPage,
};