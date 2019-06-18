
module.exports.postcreate = function(req,res, next){
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
    /* Sử dụng res.locals.muondatgidat = value  để truyền dữ liệu cho thằng midleware tiếp theo*/
    res.locals.user = "abc" ; 
    res.locals.vovan = true; 
    next(); 

}