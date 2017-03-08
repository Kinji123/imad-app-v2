//Counter code
var button=document.getElementById('counter');
var counter=0;
button.onclick= function(){
  //make a request to counter endpoint
  
  //capture a response and store it in the variable
  
  //render the varaible in the corerrct sapn
  conter++;
  var span=document.getElementById('count');
  span.innerHTML=counter.toString();
};