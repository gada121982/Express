var express = require('express'); 
var router = express.Router(); 
controller  = require('../controllers/cart.controller') ; 

router.get('/add/:productId', controller.addToCart);

module.exports  = router; 