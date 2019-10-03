document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        movePoint(0, -1);
        console.log('up');
    }
    else if (e.keyCode == '40') {
        // down arrow
        movePoint(0, 1);
    }
    else if (e.keyCode == '37') {
       // left arrow
       movePoint(-1, 0);
    }
    else if (e.keyCode == '39') {
       // right arrow
       movePoint(1, 0);
    }

}
