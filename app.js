//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");//these package is used to convert string into lower string of routing paramter
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let composecontent;
let tit;
var global_var=[];
var post_object;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.set('view engine', 'ejs');    //set templating engine as ejs

app.get("/",function(req,res)  //home page
{
  res.render("home.ejs",{homecontent:homeStartingContent,array:global_var});
})

app.get("/about",function(req,res)//about page
{
  res.render("about.ejs",{aboutp:aboutContent
  })
})

app.get("/contact",function(req,res)//contact page
{
  res.render("contact",{contactinfo:contactContent})
})

app.get("/compose",function(req,res)
{
  res.render("compose",{valueofcompose:composecontent})
})

//routing patamet is used for dynamic programming
//parameter can define with :
// app.get("/posts/:userid",function(req,res)
// {
//   console.log(req.params.userid)
// })
app.post("/compose",function(req,res)
{

  post_object={composecontent:req.body.publish,
  tit:req.body.title}

  global_var.push(post_object);


console.log(global_var)
 //res.redirect("/compose")
//res.render("home",{homecontent:homeStartingContent,array:global_var})

   res.render("post",{array:global_var})

})
app.get("/posts/:userid",function(req,res)
{
  global_var.forEach(function(globa)
  {
    if(_.lowerCase(req.params.userid)===_.lowerCase(globa.tit))
    {
      console.log("match found");
      return;
    }
    else
    {
      console.log("match does not found");
    }
  })
  global_var.forEach(function(globa)
{
  if(globa.tit===req.params.userid)
  {
    res.render("user",{tatal:globa.tit,content:globa.composecontent})
  }
})



})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
