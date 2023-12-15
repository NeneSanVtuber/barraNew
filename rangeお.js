
class rangeOtane{
  constructor(range){
    // console.log(range);
    this.id=range.id;
    this.pressed=false;;
    this.track=document.getElementById('track-'+this.id);
    this.thumb = document.getElementById('thumb-'+this.id);
    range.addEventListener('click', (event)=>{
      this.calcularPositionInElement(event,range);
    });
    range.addEventListener('mousedown', (event)=>{
      this.pressed=true;
      var positionOnDisplay= event['clientX'] - event['layerX'];
      var rangeWidth =range.offsetWidth;
      this.setEventRange(positionOnDisplay,rangeWidth,range,);
     });
    range.addEventListener('mouseup', ()=>{
      this.estatusMedia(1);
      this.pressed = false;
    });
    document.addEventListener('mouseup', ()=>{ 
      this.pressed = false;
      this.estatusMedia(1);
      
    });
  }
   setEventRange(positionOnDisplay,rangeWidth,range){
    this.estatusMedia(0);
    range.addEventListener('mousemove',(mm)=>{
      if(mm.target && this.pressed && mm.target.id=='range'){
        this.calcularPositionInElement(mm,range);
      }
    });
    document.addEventListener('mousemove',(mm)=>{
      if(this.pressed){
        this.calculatePositionOnClient(mm,positionOnDisplay,rangeWidth);
        }
    });
}  
   calculatePositionOnClient(event, positionOnDisplay, rangeWidth){
    var newValueForRange=event['clientX']-positionOnDisplay;
    if(newValueForRange<=rangeWidth & newValueForRange>=0){
      this.calcularPosition(newValueForRange,rangeWidth);
    }
  }
  calcularPosition(layerX,rangeWidth){
    var newPost=(layerX/rangeWidth)*100;
    if(this.media){
      this.setMediaNewCurrent((this.media.duration*newPost)/100)
    }
    this.setPosition(newPost);
  }
  calcularPositionInElement(event ,range){
    var layerX=event['layerX'];
    var rangeWidth=range.offsetWidth;
    this.calcularPosition(layerX,rangeWidth);

  }
  setPosition(valor) {
    this.thumb.style.left=valor+"%";
    this.track.style.width=valor+"%";
  }
  setMediaSlider(mediaElement){
    this.media=mediaElement
    this.media.addEventListener('timeupdate',()=>{
      var newValue=(this.media.currentTime/this.media.duration)*100;
      this.setPosition(newValue);
    });  
    return 1;
    
  }
  setMediaNewCurrent(newCurrentTime){
    if(this.media){
      this.media.currentTime=newCurrentTime;
    }
  }
  estatusMedia(value){
    if(this.media && value){
        this.media.play();
    }else if(this.media){
      this.media.pause();
    }
  }
}
// class setMediaSlider extends rangeOtane{
//   constructor(range, mediaElement){
//     super();
//     this.media=mediaElement
//     var newValue=(this.media.currentTime/this.media.duration)*100;
//     this.setPosition(newValue);
//   }
// }
var RangeOtane={};
// document.addEventListener("DOMContentLoaded", ()=> {
var range = document.getElementsByTagName("range");

for (var i = 0; i < range.length; i++) {
  var track = document.createElement("track");
    track.id="track-"+range[i].id;
    track.className="track-"+range[i].id;
  var thumb = document.createElement("thumb");
    thumb.id="thumb-"+range[i].id;
    thumb.className="thumb-"+range[i].id;
    range[i].appendChild(track);
    range[i].appendChild(thumb);
    var newObjet = new rangeOtane(range[i]);
    var newNameForRange=range[i].id;
    RangeOtane[newNameForRange] = newObjet;
}
// })