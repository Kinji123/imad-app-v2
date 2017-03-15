//Counter code
var button=document.getElementById('counter');


button.onclick= function(){
  //create a request to counter endpoint
  var request= new XMLHttpRequest();
  //capture a response and store it in the variable
  request.onreadystatechange= function(){
    if(request.readyState === XMLHttpRequest.DONE){
        if(request.status === 200){
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter;        
        }
    }
};

//make a request
request.open('GET','/counter', true);
request.send(null);
};
//capture name

var submit=document.getElementById('submit_btn');
var submit2=document.getElementById('submit_btn2');

submit2.onclick = function(){
//create a request to counter endpoint
  var request= new XMLHttpRequest();
  
  
  //capture a response and store it in the variable
  request.onreadystatechange= function(){
    if(request.readyState === XMLHttpRequest.DONE){
        if(request.status === 200){
             //capture a list of names and render it as a list
            var comments= request.responseText;
            comments=JSON.parse(comments);
            var list='';
            for(var i=0; i< comments.length; i++){
            list+='<li>' + comments[i] + '</li>';
        }
        var ul=document.getElementById('commentlist');
        ul.innerHTML+=list;
        }
    }
};
var commentInput=document.getElementById('comment');
var comment=commentInput.value;
//make a request
request.open('GET','http://kinji123.imad.hasura-app.io/comments?comment=' +comment, true);
request.send(null);
};

submit.onclick = function(){
//create a request to counter endpoint
  var request= new XMLHttpRequest();
  
  
  //capture a response and store it in the variable
  request.onreadystatechange= function(){
    if(request.readyState === XMLHttpRequest.DONE){
        if(request.status === 200){
             //capture a list of names and render it as a list
            var names= request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0; i< names.length; i++){
            list+='<li>' + names[i] + '</li>';
        }
        var ul=document.getElementById('namelist');
        ul.innerHTML=list;
        }
    }
};
var nameInput=document.getElementById('name');
var name=nameInput.value;
//make a request
request.open('GET','http://kinji123.imad.hasura-app.io/submit-name?name=' + name, true);
request.send(null);
};
    
   