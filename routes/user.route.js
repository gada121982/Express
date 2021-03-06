var express = require('express') ; 
var multer  = require('multer'); 
var router = express.Router(); 
var validate = require('../validate/user.validate') ; 
var controller = require('../controllers/user.controller') ; 
var authMiddleware = require('../middlewares/auth.middlewares'); 
var upload = multer({ dest: './public/uploads' }) ; 
/*Khi người dùng nhập url truy xuất vào trang này , 
thì như bên dưới ta định nghĩa , ta sẽ trả về 1 cookie có user-id = 12345
và từ đó , mỗi khi ng dùng request bất kì 1 req nào thì nó đều gửi theo 1 cookie này
 */

 /**
  * có thể để authMiddleware.requireAuth ở trước ntn để cho ng dùng
  * không thể vô trang nào khi chưa đăng nhập
  * nhưng vẫn có 1 cách khác là ra file index.js block luôn cái app.use('/user',userRoute);
  * 
  */

router.get('/',  controller.index); 

router.get('/search',controller.search);

router.get('/create', controller.create);
// lấy chỉ số id khi với req.parsam.id
router.get('/:id',controller.get ) ; 
    
/* nhớ single('avatar) , trong đó biến avatar phải trùng với chữ avatar bên 
thằng form name="avatar" của create.pug
*/
router.post('/create',upload.single('avatar'),
validate.postcreate , 
 controller.postCreate); 
module.exports = router;  
