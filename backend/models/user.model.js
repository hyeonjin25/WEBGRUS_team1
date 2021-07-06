const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { model } = mongoose;

const UsernameSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
});

const UserSchema = new Schema({
    username: UsernameSchema,
    userid: { type: String, index: true, unique: true, required: true },
    useremail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    followercnt: { type: Number, min: 0, default: 0 },
    followers: [String],
    followingcnt: { type: Number, min: 0, default: 0 },
    followings: [String],
    watched: [String],
    favorites: [String],
});

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

module.exports = model('User', UserSchema);