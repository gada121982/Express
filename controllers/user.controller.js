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
    var errors = [] ; 
    if(!req.body.name){
        errors.push('Name is required'); 
    }; 
    if(!req.body.phone){
        errors.push('Phone is required'); 
    }; 
    if(errors.length){

        res.render('user/create' , {
            errors:errors ,
            values: req.body
        }); 
        return ; 
    }

    db.get('user').push(req.body).write() ; 
    res.redirect('/user');// chuyển hướng người dùng về trang user. 

    
} ;