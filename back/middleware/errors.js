module.exports = (function(req,res,next){
    res.status(404).json({error: 'Route non trouvée'}); 
})
