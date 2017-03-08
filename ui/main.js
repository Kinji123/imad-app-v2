//Counter code
var button=document.getElementById('counter');


button.onclick= function(){
  //create a request to counter endpoint
  var request= new XMLHttpRequest();
  
  
  //capture a response and store it in the variable
  request.onreadystatechange= function(){
    if(request.readystate === XMLHttpRequest.DONE){
        if(request.status === 200){
            var counter=request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();        
        }
    }
};

//make a request
request.open('GET','http://kinji123.imad.hasura-app.io/counter', true);
request.send(null);
};