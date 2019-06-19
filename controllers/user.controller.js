var db = require('../db') ; 
const shortid = require('shortid');


module.exports.index = (req,res)=>{
         res.render('user/user',{
         users: db.get('user').value()
        })
      
    };

module.exports.search = function(req,res){

    var q = req.query.q; 
    console.log(req.query); 
    var users = db.get('user').value(); 
    var matchedUsers = users.filter(function(user){

        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1  ; 
    }) ; 
    res.render('user/user', {
        users:matchedUsers 
    });
   
}; 
module.exports.create = (req, res) => {
    
    /**
     * khi console.log(req.coookies) này ra thì sever sẽ không đọc đc và mang gt undefint
     * mún đọc được thì phải cài thêm npm install cookie-parser và require nó . 
     * có thể lên trang express tìm req.cookie để đọc thêm
     * https://www.npmjs.com/package/cookie-parser
     */
     
    res.render('user/create');
    
} ;
module.exports.get = (req, res) => {

    
    var id = req.params.id;  
    var user = db.get('user').find({ id: id}).value() ; 
    res.render('user/view',{

        user: user 
    });
    

};
module.exports.postCreate = (req, res) => {

    
    req.body.id = shortid.generate(); 
    req.body.avatar = req.file.path.split("\\").slice(1).join("\\") ;  
    console.log(req.body.avatar) ;  
    console.log(req.body) ; 
    db.get('user').push(req.body).write() ; 
    res.redirect('/user');// chuyển hướng người dùng về trang user. 
    console.log(res.locals); // biến được lưu trong user.validate.js chuyển qua đây
    
} ;