console.log('Loaded!');

//change the content of main-txt
var element=document.getElementById('main-txt');
element.innerHTML='Kinjal Roy';

//move the img
var img=document.getElementById('madi');
img.onclick= function(){
    img.style.marginLeft ='100px';
};
