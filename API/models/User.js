const mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {
            type: Boolean,
            default: false,
        },
        img: {type: String},

    },
    {timestamps: true}
);

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model("User", UserSchema)