var db = require('../db'); 

module.exports.addToCart = (req,res,next)=>{
    var productId = req.params.productId ; 
    var sessionId = req.signedCookies.sessionId ; 
    if (!sessionId){
         res.redirect('/products');
         return ; 
    }; 
    /**
     * get thằng sessions trong db , tìm thằng id có id = sessionId
     * sau đó set thêm 1 object cart có thuộc tính productId và có giá trị
     * của thuộc tính productId : 1 
     * như này
     *  "sessions": [
    {
      "id": "P_lnVSrPO",
      "cart": {
        "5eb34c63-f881-4402-9d84-97f605c2ec31": 1
      }
    }
  ]
     */
    var count = db.get('sessions').find({id: sessionId}).get('cart.'+ productId,0).value() ;


    db.get('sessions').find({id: sessionId})
    .set('cart.'+ productId,count +1)
    .write(); 
    res.redirect('/products');
    
}; 