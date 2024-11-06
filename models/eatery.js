import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import validator from 'validator';

import { createCode } from '../tools/random.js';

const eaterySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot be more than 50 characters long'],
        validate: {
            validator: validator.isAlpha,
            message: 'Name should only contain alphabetical characters'
        }
    },

    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },

    verification: {
        status: {
            type: Boolean,
            default: false
        },

        code: {
            type: String,
            default: createCode(6)
        }
    },

    profilePicture: {
        type: String,
        default: ''
    },

    profilePictureId: {
        type: String,
        default: ''
    },

    address: {
        type: String,
        trim: true,
        maxlength: [50, 'Address cannot be more than 50 characters long'],
        default: ''
    },
});

Eatery.methods.resetVerificationCode = async function () {
    this.verification.code = createCode(6);
    return await this.save();
};

Eatery.methods.verified = async function () {
    this.verification.status = true;
    this.verification.code = null;
    return await this.save();
};

const Eatery = mongoose.model('Eatery', eaterySchema);

export default Eatery;