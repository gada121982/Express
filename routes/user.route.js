var express = require('express') ; 
var router = express.Router(); 
var validate = require('../validate/user.validate') ; 
var controller = require('../controllers/user.controller') ; 

/*Khi người dùng nhập url truy xuất vào trang này , 
thì như bên dưới ta định nghĩa , ta sẽ trả về 1 cookie có user-id = 12345
và từ đó , mỗi khi ng dùng request bất kì 1 req nào thì nó đều gửi theo 1 cookie này
 */
router.get('/cookie', (req, res) => {
    res.cookie('user-id',12345);
    res.send("hello") ;
});

router.get('/', controller.index); 

router.get('/search',controller.search);

router.get('/create', controller.create);
// lấy chỉ số id khi với req.parsam.id
router.get('/:id',controller.get ) ; 
    

router.post('/create',validate.postcreate ,  controller.postCreate); 
module.exports = router;  
