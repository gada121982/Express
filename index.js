require('dotenv').config(); 

const express = require('express');  
const app = express(); 
const cookieParser = require('cookie-parser') ; 

var authMiddleware = require('./middlewares/auth.middlewares'); 

const userRoute = require('./routes/user.route') ; 
const authRoute = require('./routes/auth.route') ; 
app.use(express.json()) ; // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.set('view engine','pug'); 
app.set('views','./views'); 
app.use(cookieParser(process.env.SESSION_SECRET));



const port = 3001;  
app.get('/',authMiddleware.requireAuth,function(req,res){
    
   res.render('index',{
       name : 'nguyen vinh hai'
   });
  
}) ; 

app.use(express.static('public')) ;
app.use('/user',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);
 

app.listen(port, ()=> console.log('examle app listening on port '+port)); 

