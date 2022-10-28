const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidV1 = require('uuid');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 55,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    salt: String,

}, { timestamps: true });

userSchema.virtual('password')
    .set(function(password){
        this._password = password,
        this.salt = uuidV1.v1(),
        this.hashedPassword = this.encryptPassword(password)
    });


userSchema.methods = {

    authenticate: function(password) {
        return this.encryptPassword(password) === this.hashedPassword;
    },
    
    encryptPassword: function(password) {
        if(!password) return '';

        try{
            return crypto.createHmac("sha1", this.salt).update(password).digest('hex');
        } catch(error) {
            return '';
        }
    }
};

module.exports = mongoose.model("User", userSchema);