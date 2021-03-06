var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser'); //import

var config ={
  host: 'db.imad.hasura-app.io',
  user: 'kinji123',
  database: 'kinji123',
  password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles = {
    'article-one': {
title:'Article one| Kinjal Roy',
heading:'Article One',
date:'11 feb 2017',
content:` <p>
             This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
             </p>
            <p>
                This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
             </p>
             <p>
                 This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
             </p>`
},
    'article-two':{
        title: 'Article two| Kinjal Roy',
        heading: 'Article Two',
        date: '11 feb 2017',
        content: `<p>
            This is the content of my second article.
            </p>`},
    'article-three':{
        title:'Article three| Kinjal Roy',
        heading:'Article Three',
        date:'11 feb 2017',
        content:` <p>
            This is the content of my third article.
            </p>`}
};


function createTemplete(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate = `
<html>
    <head>
       <title>
           ${title}
       </title>
       
       <meta name= "viewport" content="width=device-width, initial-scale=1" />
       <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
         <div>
             <a href="/"> Home </a>
         </div>
         <hr/>
         <h3>
             ${heading}
         </h3>
         <div>
             ${date.toDateString()} 
         </div>
         <div>
             ${content}
         </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf', '10000', salt, hashed.toString('hex')].join('$');
    
}

app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.get('/create-user',function(req,res){
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbSring], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('username successfully created: ' +username); 
        }
    });
});
var counter=0;
app.get('/counter', function(req,res){
   counter= counter + 1;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function (req,res){ // URL: /submit-name?name=xxxx
    //get the request object
     var name = req.query.name;//TODO
    names.push(name);
    res.send(JSON.stringify(names)); //TODO
});
 
 var comments=[];
 app.get('/comments',function(req,res){
     var comment= req.query.comment;
     comments.push(comment);
     res.send(JSON.stringify(comments));
 });

app.get('/articles/:articleName',function(req,res){
   pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err,result){
      if(err){
          res.status(500).send(err.toString());
        }
        else{
          if(result.rows.length === 0){
              res.status(404).send('Article not found');
            }
          else{
              var articleData = result.rows[0];
              res.send(createTemplete(articleData));  
            }
        }
    });
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
