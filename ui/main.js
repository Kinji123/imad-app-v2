console.log('Loaded!');

//change the content of main-txt
var element=document.getElementById('main-txt');
element.innerHTML='Kinjal Roy';

//move the img
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft= marginLeft+ 'px';
}
img.onclick= function(){
    var Interval= setinterval(moveRight, 100);
};
