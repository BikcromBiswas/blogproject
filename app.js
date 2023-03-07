//jshint esversion:6
//Here is my changes in branch1
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/blogdb").then((e)=>
{
    console.log('mongodb successfully connected');
})
const blogschema = mongoose.Schema({
  postTitle:String,
  postBody:String
})
const blog = mongoose.model('blog',blogschema)
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
let arr=[];
app.get("/",(req,res)=>
{
  blog.find({}).then((arr)=>
  {
    res.render('home',{homeStartingContent:homeStartingContent,arr:arr});
  },(err)=>
  {
    res.send('<h1>Error 404</h1>');
  })
})
app.get("/about",(req,res)=>
{
  res.render('about',{aboutContent:aboutContent});
})
app.get("/contact",(req,res)=>
{
  res.render('contact',{contactContent:contactContent});
})
app.get("/compose",(req,res)=>
{   
  res.render('compose');
})
app.get('/post/:userID',(req,res)=>
{
  let smalluserId = _.lowerCase(req.params.userID);
  console.log(smalluserId);
  let flag = true;
  arr.forEach((obj)=>
  {
    let title  = _.lowerCase(obj.postTitle);
    console.log(title);
    if(title === smalluserId)
    {
      flag = false;

      res.render('post',{postTitle : obj.postTitle,postContent:obj.postBody})
    }
  })
  if(flag)
  {
    res.send("<h1>Error 404</h1>");
  }
})
app.post("/compose",(req,res)=>{
 
    const blogTitle = req.body.postTitle;
    const blogBody = req.body.postBody;
    let b = new blog({
      postTitle:blogTitle,
      postBody:blogBody
    })
    b.save();
    res.redirect("/")
})

app.listen(3000, function() {
  console.log(`Server started on port http://localhost:3000`);
  
});
