const mongoose = require('mongoose')
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(03|05|07|08|09)\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid Vietnamese phone number!`
        },
    },
    address: {
        type: String,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    createdAT: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User', userSchema)