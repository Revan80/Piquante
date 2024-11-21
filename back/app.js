const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const stuffRoutes = require('./routes/stuff');
const errors = require('./middleware/errors');

mongoose.connect('mongodb+srv://alexander:123@cluster0.7hq3b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
        
        
        const app = express();
        app.use(express.json());


        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();

    app.use('/api/sauces', stuffRoutes);
    app.use('/api/auth',userRoutes);

    //middleware pour les erreurs de routes
    app.use(errors);
    module.exports = app;
});




