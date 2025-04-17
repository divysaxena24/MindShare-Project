//"REST"(representational State Transfer)

//=> it is an architechtural style that defines a set of constraints used for creating web services.
 //used to perform CURD operations.
 //C(Create) R(Read) U(Update) D(Delete).
 

 //CRUD operations includes:-

 //"GET"--> retrieves resources. ("/posts"-->to get data for all posts)
 //"POST"--> Submit new Data to the server. ("/posts"-->to add a new post)
 //"PUT"--> Update existing data.("/posts/:id"-->to get one post(using id))
 //"PATCH"-->Update existing data partially. ("/posts/:id"-->to update specific post)
 //"DELETE"-->remove data. ("/posts/:id"--> to delete specific post)

const express=require("express");
const app=express();

const port=8080;

const path=require("path");

const { v4: uuidv4 } = require('uuid');
uuidv4();


var methodOverride = require('method-override')

//For creating ids of new elements we will use "uuid" by installing "npm i uuid" (Universally Unique Identifier)
//go to "npmjs.com" and copy code from their.

app.use(methodOverride('_method'))


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
//if ejs and css styling is not applied set it to "app.use" from "app.set"

let posts=[
    {
        id:uuidv4(),
        username:"Divya Saxena",
        content: "I love coding!"
    },

    {
        id:uuidv4(),
        username:"Amit Sehgal",
        content:"I got selected for my internship"
    },

    {
        id:uuidv4(),
        username:"Rahul",
        content:"hard work is very very important for success"
    }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
//create "GET:--> /posts"

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;

    id=uuidv4();

    posts.push({id,username,content});

    res.redirect("http://localhost:8080/posts")
    
    //"res,redirect is use to redirect one page to another"
})

app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("show.ejs",{post})
})

//here we are using patch request as we are updating specific thing
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;

    let newContent=req.body.content;

    let post=posts.find((p)=>id==p.id);

    post.content=newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
let {id}=req.params;
let post=posts.find((p)=>id===p.id);

res.render("edits.ejs",{post})
})


app.delete("/posts/:id",(req,res)=>{
let {id}=req.params;
posts=posts.filter((p)=>id!=p.id);
res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})
