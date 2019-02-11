const { search } = require('../scripts/createTree');

module.exports = {
    findAllRelatedWords,
}

function findAllRelatedWords(req, res, next){
    console.log("req.params ", req.params)
    return res.status(200).send(search(req.params.query)); 
}