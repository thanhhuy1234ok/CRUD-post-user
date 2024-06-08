const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,

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