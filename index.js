require('dotenv').config(); 

const express = require('express');  
const app = express(); 
const cookieParser = require('cookie-parser') ; 

var authMiddleware = require('./middlewares/auth.middlewares'); 

const userRoute = require('./routes/user.route') ; 
const authRoute = require('./routes/auth.route') ; 
const productRoute = require('./routes/product.route'); 
const sessionMiddleware = require('./middlewares/session.middlewares.js') ; 
const cartRoute = require('./routes/cart.route') ;

app.use(express.json()) ; // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.set('view engine','pug'); 
app.set('views','./views'); 
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware); // Chương trình chạy check dòng này xem có session chưa , nếu có next , chưa có cấp session

const port = 3001;  
app.get('/',function(req,res){
    
   res.render('index',{
       name : 'nguyen vinh hai'
   });
  
}) ; 

app.use(express.static('public')) ;
app.use('/user',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);
app.use('/products',authMiddleware.requireAuth,productRoute); 
app.use('/cart',cartRoute); 

app.listen(port, ()=> console.log('examle app listening on port '+port)); 

