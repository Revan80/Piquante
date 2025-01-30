const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    let userId = req.auth.userId;

    const sauce = new Sauce({
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: userId
    });

    sauce.save()
        .then(() => res.status(201).json({
            message: 'Sauce créé',
            key: sauce.userId
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.deleteSauce = (req, res, next) => {
    let userId = req.auth.userId;
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            if (userId !== sauce.userId) {
                return res.status(403).json({
                    error: "Vous n'etes pas autorisé à supprimer !"
                });

            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Sauce supprimée'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })

        .catch(error => res.status(500).json({
            error
        }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({
            error
        }));
};
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({
            error
        }));
};

exports.modifySauce = (req, res, next) => {
    let userId = req.auth.userId;
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            if (!sauce) {
                return res.status(404).json({
                    error: 'Sauce non trouvée'
                });
            }
            if (userId !== sauce.userId) {
                return res.status(403).json({
                    error: "Vous n'êtes pas autorisé à modifier cette sauce !"
                });
            }
            Sauce.updateOne({
                    _id: req.params.id
                }, {
                    name: req.body.name,
                    ingredient: req.body.ingredients,
                    _id: req.params.id,
                    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : Sauce.imageUrl,
                })
                .then(() => res.status(200).json({
                    message: 'Sauce modifiée'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};


exports.like = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            if (!sauce) {
                return res.status(404).json({
                    error: 'error'
                });
            }
            const userId = req.auth.userId;
            const likeStatus = req.body.like;

            if (likeStatus === 1) {
                if (sauce.usersLiked.includes(userId)) {
                    return res.status(400).json({
                        error: "Impossible de like deux fois"
                    });
                } else if (sauce.usersDisliked.includes(userId)) {
                    return res.status(400).json({
                        error: "Impossible de like et de dislike"
                    });
                }
                sauce.usersLiked.push(userId);
                sauce.likes++;
            } else if (likeStatus === -1) {
                if (sauce.usersLiked.includes(userId)) {
                    return res.status(400).json({
                        error: "Impossible de like et dislike"
                    });
                } else if (sauce.usersDisliked.includes(userId)) {
                    return res.status(400).json({
                        error: "Impossible de dislike"
                    });
                }
                sauce.usersDisliked.push(userId);
                sauce.dislikes++;
            } else {
                if (sauce.usersLiked.includes(userId)) {
                    sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
                    sauce.likes--;
                } else if (sauce.usersDisliked.includes(userId)) {
                    sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
                    sauce.dislikes--;
                }
            }

            sauce.save()
                .then(() => res.status(200).json({
                    message: 'save'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};