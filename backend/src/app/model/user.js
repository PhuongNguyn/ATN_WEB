const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const User = new mongoose.Schema({
    userName: { type: String, maxlength: 255 },
    userPassword: { type: String, maxlength: 36 },
    userAccess:{ type: Boolean, default: false},
    userImage:  {type: String, default: 'default-user-image.jpeg'},
    slug: { type: String, slug: 'userName' },
    createAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('users', User);