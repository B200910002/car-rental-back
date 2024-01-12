const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const driveLicenseSchema = new Schema({
    driveLicenseNumber: { 
        type: String, 
        required: true,
        validate: [
            {
                validator: value => value.length >= 3,
                message: 'Drive License Code must be at least 3 characters long',
            }
        ]
    },
    driveLicenseStartAt: { 
        type: Date,
        required: true,
    },
    driveLicenseEndAt: {
        type: Date, 
        required: true,
        validate: [
            {
                validator: value => this.driveLicenseStartAt < value,
                message: 'Drive License End Date must be after the Start Date',
            }
        ]
    },
})

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        validate: [
            {
                validator: value => value.length >= 3,
                message: 'Firstname must be at least 3 characters long',
            }
        ]
    },
    lastName: {
        type: String,
        required: true,
        validate: [
            {
                validator: value => value.length >= 3,
                message: 'Lastname must be at least 3 characters long',
            }
        ]
    },
    registerNumber: {
        type: String,
        required: true,
        validate: [
            {
                validator: value => value.length == 10,
                message: 'Register number must be 10 characters long',
            },
            {
                validator: value => isNaN(value.substring(0, 2)),
                message: 'Register number must be started 2 characters string',
            },
            {
                validator: value => /^\d+$/.test(value.substring(2)),
                message: 'Register number must be end 8 characters number',
            }
        ]
    },
    driveLicense: {
        type: driveLicenseSchema,
        required: true,
    },
    profile: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [
            {
                validator: validator.isEmail,
                message: 'Invalid email address'
            }
        ]
    },
    phone: {
        type: String,
        required: true,
        validate: [
            {
                validator: value => value.length >= 8,
                message: 'Password must be at least 8 characters long',
            }
        ]
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

userSchema.statics.register = async function (fname, lName, email, phone, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.create({
        firstName: fname,
        lastName: lName,
        email: email,
        phone: phone,
        password: hashedPassword
    });

    return jwt.sign(
        { 
            _id: user._id, 
            firstName: user?.firstName, 
            lastName: user?.lastName, 
            email: user?.email,
            phone: user?.phone,
            about: user?.about,
            profile: user?.profile
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "1d" }
    );
};

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
        return jwt.sign(
            { 
                _id: user._id, 
                firstName: user?.firstName, 
                lastName: user?.lastName, 
                email: user?.email,
                phone: user?.phone,
                about: user?.about,
                profile: user?.profile
            },
            process.env.SECRET_TOKEN,
            { expiresIn: "1d" }
        );
    } else {
        throw Error("Incorrect email or password");
    }
};

userSchema.statics.changePassword = async function (
    user,
    oldPassword,
    newPassword,
    repeatNewPassword
) {
    if (!oldPassword || !newPassword || !repeatNewPassword) {
        throw new Error("All fields must be filled");
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new Error("Old password is not valid");
    }
    if (newPassword !== repeatNewPassword) {
        throw new Error("Password not matched");
    }
    if (!validator.isStrongPassword(newPassword)) {
        throw Error("Password not strong enough: Uppercase, lowercase, numbers, special characters (!@#$&*~)...");
    }
    if (user && isPasswordValid) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    }
    return "Password changed";
};

module.exports = {
    User: mongoose.model("User", userSchema),
    userSchema
}