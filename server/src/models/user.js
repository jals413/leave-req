const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: true,
        },           
        userEmail:{
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        userPassword:{
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            unique: false
        },
        userRole:{
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        timestamp: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;


