const express=require('express');
const bodyParser = require('body-parser');
const ejs =require('ejs');
const mongoose =require('mongoose');

const app = express();

app.use(express.static("public"));app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Here i'm going to register username,password in db
mongoose.connect("mongodb://127.0.0.1:27017/userdb", { useNewUrlParser: true  });


const user = {
  Email: String,
  Password: String
};

const usecoll =new mongoose.model("user", user);

app.get("/",function(req,res){
    res.render("home");
})

app.get("/register",function(req,res){
    res.render("register");
})
app.get("/login",function(req,res){
    res.render("login");
})


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
  
})


app.listen(3001,function(){
    console.log("Server started on port 3000");
})