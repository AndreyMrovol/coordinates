var wholeJSON;
var ff;

function zoomIn(event) {
  var element = document.getElementById("overlay");
  element.style.display = "inline-block";
  var img = document.getElementById("imgZoom");
  var posX = event.offsetX ? (event.offsetX) : event.pageX;
  var posY = event.offsetY ? (event.offsetY) : event.pageY;

  var positionInfo = img.getBoundingClientRect();
  var width = positionInfo.width;

  var overlayWidth = 300;
  var markerDimen = (overlayWidth/2) - (50/2);

  var picture = document.getElementById("marker");

  picture.style.left = markerDimen + 'px';
  picture.style.top = markerDimen + 'px';
  picture.style.position = 'absolute';

  var start = 2048;
  ff = start / width;

  // Get X and Y position of the elm (from: vishalsays.wordpress.com)
  function getXYpos(elm) {
    x = elm.offsetLeft;        // set x to elm’s offsetLeft
    y = elm.offsetTop;         // set y to elm’s offsetTop

    elm = elm.offsetParent;    // set elm to its offsetParent

    //use while loop to check if elm is null
    // if not then add current elm’s offsetLeft to x
    //offsetTop to y and set elm to its offsetParent
    while(elm != null) {
      x = parseInt(x) + parseInt(elm.offsetLeft);
      y = parseInt(y) + parseInt(elm.offsetTop);
      elm = elm.offsetParent;
    }

    // returns an object with "xp" (Left), "=yp" (Top) position
    return {'xp':x, 'yp':y};
  }

  var xy_pos = getXYpos(img);

  x = event.pageX;
  y = event.pageY;

  x = x - xy_pos['xp'];
  y = y - xy_pos['yp'];

  let cX = x * ff;
  let cY = y * ff;

  var point = document.getElementById('point');
  point.style.top = y + 'px';
  point.style.left = x + 'px';

  let printN = '""';
  let printC = '"' + Math.round(cX) + '/' + Math.round(cY) + '"';

  wholeJSON = '\n' + '\t \t "coordinates": ' + printC + '\n';
//  document.getElementById('number').innerHTML = printN;
  document.getElementById('coordinates').innerHTML = printC;
  document.getElementById("copied").classList.remove('animated');

//  document.getElementById('coords').innerHTML = 'X= '+ cX+ ' ,Y= ' +cY;

   posX = x;
   posY = y;

  var imageC = ((-posX * ff) +150) + "px " + ((-posY * ff) +150) + "px";
  element.style.backgroundPosition = imageC;

//  console.log(imageC);

}

function movePoint(x,y){
  var point = document.getElementById('point');

  let pX = point.style.left;
  let pY = point.style.top;

    pX = pX.replace('px', '');
    pY = pY.replace('px', '');

   x = +pX + +x;
   y = +pY + +y;

   point.style.left = x + 'px';
   point.style.top = y + 'px';

   var zoomed = document.getElementById("overlay");
   var imageC = ((-x * ff) +150) + "px " + ((-y * ff) +150) + "px";
   zoomed.style.backgroundPosition = imageC;

   let printN = '""';
   let printC = '"' + Math.round(x*ff) + '/' + Math.round(y*ff) + '"';

   wholeJSON = '\n' + '\t \t "coordinates": ' + printC + '\n';
   document.getElementById('coordinates').innerHTML = printC;
}

function getCXY(){
  let arr = [];

  arr.push(x*ff);
  arr.push(y*ff);

  return arr;
}

function zoomOut() {
  var element = document.getElementById("overlay");
//  element.style.display = "none";
}

function copyToClipboard(text) {
var dummy = document.createElement("textarea");
// to avoid breaking orgain page when copying more words
// cant copy when adding below this code
// dummy.style.display = 'none'
document.body.appendChild(dummy);
//Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
dummy.value = text;
dummy.select();
document.execCommand("copy");
document.body.removeChild(dummy);
}

$("body").keypress(function(event) {
            if (event.keyCode === 13) {

              copyToClipboard(wholeJSON);
              var elem = document.getElementById("copied");
              document.getElementById("copied").innerHTML = wholeJSON;
              elem.classList.add('animated');
              console.log('ENTER');

              $(this).delay(1000).queue(function() {  // Wait for 1 second.
                elem.removeClass("animated");
               });

            }
        });
