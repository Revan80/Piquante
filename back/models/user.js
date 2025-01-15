const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10); // Génère un sel
        this.password = await bcrypt.hash(this.password, salt); // hache avec le sel une instance deuserSchema
        next(); // passe au middleware suivant
    } catch (error) {
        next(error); 
    }
});

module.exports = mongoose.model('User', userSchema);






























