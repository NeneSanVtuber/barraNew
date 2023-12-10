var range=document.getElementById('range');
var message=document.getElementById('message');
var track=document.getElementById('track');
var thumb=document.getElementById('thumb');
// var thumb=document.getElementById('thumb');
var infoVideo =document.getElementById('infoVideo');
var barraInfo =document.getElementById('barraInfo');
var pressed=false;
video.addEventListener('timeupdate',()=>{
  // alert("Hola");
  var Time = video.duration;
  var current=video.currentTime;
  infoVideo.innerHTML="Video <br> D:"+Time+"<br> C:"+current;
  setPosition((current/Time)*100);
})


range.addEventListener('click', (e)=>{
  // log(e);
  calcularPos(e,1);
});

range.addEventListener('mousedown', (e)=>{
 pressed=true;
 video.pause();
 var positionOnDisplay= e['clientX'] - e['layerX'];
 var rangeWidth =range.offsetWidth;
 log('positionOnDisplay: '+positionOnDisplay +' ClientX: '+e['clientX']);
 setEventRange(positionOnDisplay,rangeWidth);
});

range.addEventListener('mouseup', (mm)=>{
  video.play();
  pressed = false;
  if(mm.target.id=='range'){
    log(mm.target.id=='range');
    calcularPos(mm,1);
  }
});
document.addEventListener('mouseup', ()=>{ 
  video.play();
  pressed = false;
});

function setEventRange(positionOnDisplay,rangeWidth){

    range.addEventListener('mousemove',(mm)=>{
      // log(mm.target.targetName);
      if(mm.target && pressed && mm.target.id=='range'){
        log(mm.target.id=='range');
        calcularPos(mm,1);
      }
    });
    document.addEventListener('mousemove',(mm)=>{
      if(pressed){
        calPositionOnClient(mm,positionOnDisplay,rangeWidth);
        log(mm);
        }
    });
}
function calPositionOnClient(event, positionOnDisplay, rangeWidth){
  var newValueForRange=event['clientX']-positionOnDisplay;
  if(newValueForRange<=rangeWidth & newValueForRange>=0){
    log('newValueForRange: '+newValueForRange + "rangeWidth: "+rangeWidth);
    var newPost=(newValueForRange/rangeWidth)*100;
    setPosition(newPost);
    var newCurrent=(video.duration*newPost)/100;
    video.currentTime=newCurrent;
  }
  
}

function calcularPos( mm ,type){
  
  var totalWidth=range.offsetWidth;
  var positionOfMouseInTheElement=mm['layerX'];
  var newPost=(positionOfMouseInTheElement/totalWidth)*100;
  
  log(newPost+'%');
  log(video.duration+' s');
  var newCurrent=(video.duration*newPost)/100;
  log(newCurrent+' S');
  video.currentTime=newCurrent;
  setPosition(newPost);
  barraInfo.innerHTML="W:"+totalWidth+"<br> %:"+newPost+"<br> NewC:"+newCurrent;
}


function position(valor){
  // post=50;
  // thumb.style.left=valor+"%";
  // track.style.width=valor+"%";
}
function setPosition(valor) {
  thumb.style.left=valor+"%";
  track.style.width=valor+"%";
}


function log(txt){
  message.innerText=txt
    console.log(txt);
  }