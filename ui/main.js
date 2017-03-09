//Counter code
var button=document.getElementById('counter');


button.onclick= function(){
  //create a request to counter endpoint
  var request= new XMLHttpRequest();
  
  
  //capture a response and store it in the variable
  request.onreadystatechange= function(){
    if(request.readystate === XMLHttpRequest.DONE){
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
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onclick = function(){
    var names=['name1','name2','name3','name4'];
    var list='';
    for(var i=0;i<names.length;i++){
        list+='<li>' + name[i] + '</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
};