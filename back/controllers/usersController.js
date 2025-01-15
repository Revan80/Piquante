const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async function (req, res, next) {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'email et mot de passe necessaire'});
        }
        
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }
        
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        return res.status(201).json({
            message: 'Utilisateur créé avec succès.',
        });

    } catch (error) {
        if (error) {
             console.log(error);
             return res.status(400).json({ message: 'Erreur creation utilisateur' });
        }
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur introuvable'});
            
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
            
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            userId: user._id,
            token: token,
            
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Erreur lors de la connexion.'});
        
    }
};
