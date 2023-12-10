
class rangeOtane{
  
  constructor(range){
    console.log(range);
    this.id=range.id;
    this.track=document.getElementById('track-'+this.id);
    this.thumb = document.getElementById('thumb-'+this.id);
    // this.name=name;
    let pressed = false;
    range.addEventListener('click', (event)=>{
      // log(e);
      this.calcularPos(event,range);
    });
  }
   calcularPos( event ,range){
    var totalWidth=range.offsetWidth;
    var positionOfMouseInTheElement=event['layerX'];
    var newPost=(positionOfMouseInTheElement/totalWidth)*100;
    console.log(newPost);
    this.setPosition(newPost);
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

var range = document.getElementsByTagName("range");
var RangeOtane={};
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
  // Hacer algo con cada elemento, por ejemplo, cambiar su color de fondo
  // console.log(range[i]);
  // console.log(new rangeOtane(range[i].id));
}

var primerObjeto = RangeOtane.range1;
var segundoObjeto = RangeOtane.range2;
var tercerObjeto = RangeOtane.range3;
// y así sucesivamente...

// Mostrar cada objeto en la consola
console.log(primerObjeto);
console.log(segundoObjeto);
console.log(tercerObjeto);

// rangeForVideo = new rangeOtane('videoControls', 'range');
// rangeForFilter = new rangeOtane('filterBlur', 'range');
// console.log(rangeForVideo);
// console.log(rangeForFilter);
video.addEventListener('timeupdate',()=>{
  // alert("Hola");
  var Time = video.duration;
  var current=video.currentTime;
  infoVideo.innerHTML="Video <br> D:"+Time+"<br> C:"+current;
  primerObjeto.setMediaSlider(video);
})