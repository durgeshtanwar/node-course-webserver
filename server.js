const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.originalUrl}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n');
    next();
})
// app.use((req,res,next)=>{
//     res.render('maintain.hbs');
// })
app.use(express.static(__dirname +'/public'));
app.get('/',(req,res)=>{
res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage:'Hello welcome to our first node website'
})
});
app.get('/about',(req,res)=>{
//res.send('about file');
res.render('about.hbs',{
    pageTitle:'about page',
    welcomeMessage:'welcome to projects page'
   });
});
app.get('/projects',(req,res) => {
res.render('projects.hbs',{
    pageTitle:'Projects Page',
    welcomeMessage:'Welcome to About Page'
});
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Unable to fetch data"
    });
})

app.listen(port,()=>{
    console.log(`server is up running on port no ${port}`);
});