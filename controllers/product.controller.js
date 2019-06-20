var db = require('../db') ; 

module.exports.product = (req,res,next)=>{
    var page = parseInt(req.query.page) || 1 ; // trang thu n
    var perPage = 8; // x phan tu trong trang 
    var start = (page-1)*perPage ; 
    var end = page*perPage ;  

    res.render('products/index', {
        products: db.get('Products').value().slice(start,end)
    });
} ; 
