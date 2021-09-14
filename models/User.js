const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id: {type: Number, required: true, unique: true, immutable: true, },
    username: {type: String, required: true, trim: true, maxlength: 100,},
    password: {
        type: String, required: true,
        // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'minimum eight characters, at least one letter and one number']
    },
    email: {
        type: String, required: true, 
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email, please enter again!' ], 
        unique: true,
    },
    birthday: {
        type: Date,
        validate: [(birthday) => {
            var now = new Date()
            if(birthday < now.getTime()) return true;
            return false;
        }, "invalid date of birth"],
    },
    gender: {type: String, }, //enum: ['male', 'female', 'unknow']
    address: {type: String, },
    phone: {type: String, }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User)