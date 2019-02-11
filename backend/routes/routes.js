let routes = require("express").Router();
let search = require("../controllers/search");

routes.get('/search/:query', search.findAllRelatedWords)

module.exports = routes;
