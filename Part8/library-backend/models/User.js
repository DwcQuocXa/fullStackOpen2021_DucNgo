const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        favoriteGenre: {
            type: String,
            required: true,
            minlength: 3
        }
    }
})

module.exports = mongoose.models.User || mongoose.model('User', schema)
