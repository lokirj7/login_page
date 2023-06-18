require('dotenv').config();
const express=require('express');
const bodyParser = require('body-parser');
const ejs =require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const app = express();


console.log(process.env.SECRET);
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Here i'm going to register username,password in db
mongoose.connect("mongodb://127.0.0.1:27017/userdb", { useNewUrlParser: true  });


const user = new mongoose.Schema ({
  Email: String,
  Password: String
});

user.plugin(encrypt, { secret:process.env.SECRET,encryptedFields: ['Password'] });

const usecoll =new mongoose.model("user", user);

app.get("/",function(req,res){
    res.render("home");
})

app.get("/register",function(req,res){
    res.render("register");
})
app.get("/login",function(req,res){
    res.render("login");
} )


app.post("/register",function(req,res){
    const newUser = new usecoll({
        Email:req.body.username,
        Password:req.body.password

    })
    newUser.save()
    .then(() => {
      res.render("register");
    })
    .catch((err) => {
      console.log(err);
    });
  
});

 app.post("/login",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
user.findOne({Email:username},function(err,founduser){
  if(err){
    console.log(err);
  }
  else{
    if(founduser){
      if(founduser.password === password){
        res.render("secrets");
      }
    }
  }
});
  

 });

app.listen(3001,function(){
    console.log("Server started on port 3000");
})