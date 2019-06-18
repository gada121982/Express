const express = require('express');  
const app = express(); 
var cookieParser = require('cookie-parser') ; 


const userRoute = require('./routes/user.route') ; 
app.use(express.json()) ; // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.set('view engine','pug'); 
app.set('views','./views'); 
app.use(cookieParser());



const port = 3001;  
app.get('/',function(req,res){
    
   res.render('index',{
       name : 'nguyen vinh hai'
   });
}) ; 
app.use(express.static('public')) ;
app.use('/user',userRoute);
 

app.listen(port, ()=> console.log('examle app listening on port '+port)); 

