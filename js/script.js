var canvas, ctx, flag = false, flag1 = false, prevX = 0, currX = 0, prevY = 0, currY = 0;
var socket = io();
var x = "black";

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    console.log(obj.id);
    switch (obj.id) {
        case "green":
            x = "green";
            flag1 = false;
            break;
        case "blue":
            x = "blue";
            flag1 = false;
            break;
        case "red":
            x = "red";
            flag1 = false;
            break;
        case "yellow":
            x = "yellow";
            flag1 = false;
            break;
        case "orange":
            x = "orange";
            flag1 = false;
            break;
        case "black":
            x = "black";
            flag1 = false;
            break;
        case "white":
            x = "white";
            flag1 = false;
            break;
        case "flag1":
            flag1 = true;
            break;
    }

}

function draw() {
    socket.emit('draw_line', prevX, prevY, currX, currY, x);
}

function erase() {
        ctx.clearRect(0, 0, w, h);
}
function cordinamica() {
    var posarray;
    var hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
    var cor_aleatoria = "#";
    for (i = 0; i < 6; i++) {
        posarray = aleatorio(0, hexadecimal.length);
        cor_aleatoria += hexadecimal[posarray];
    }
    return cor_aleatoria;
}
function aleatorio(inferior, superior) {
    var numPossibilidades = 0;
    var aleat = 0;
    numPossibilidades = superior - inferior;
    aleat = Math.random() * numPossibilidades;
    aleat = Math.floor(aleat);
    return parseInt(inferior) + aleat;
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        flag = true;
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

socket.on('draw_line', function (a, b, c, d, x) {
    if (flag1) {
        ctx.strokeStyle = cordinamica();
    } else {
        ctx.strokeStyle = x;
    }
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.stroke();
    var i = 0;
    while (i <= 0.5) {
        ctx.moveTo(a - i, b - i);
        ctx.lineTo(c + i, d + i);
        ctx.stroke();
        i += 0.1;
    }

});