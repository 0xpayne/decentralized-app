var slider = document.getElementById("myRange");

var x;
var lines = [];

/* Params: 
a = (x,y) tuple for start point
b = (x,y) tuple for end point
c = line color string
*/
function Line(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

slider.oninput = function() {
    x = this.value;
    init();
}

function init() { // initialize Koch curve lines creator
    var canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    context.beginPath();
    context.stroke();
    context.closePath();
    lines = [];
    context.clearRect(0,0,500,500);
    koch([50,150], [500,150],x); // top line
    koch([270,490], [50,150],x); // left line
    koch([500,150],[270,490],x); // right line
    for (var i = 0; i < lines.length; i++) {
      DrawLine(lines[i].a, lines[i].b, lines[i].c);
    }
}

/* Params:
A = starting point (x,y) of most recently added line
B = ending point (x,y) of most recently added line
depth = number of self-similarity iterations to go. Gets computationally heavy at n > 6
*/

function koch(newStart, newEnd, depth) { // draw koch curve recursively

    // base case
    if (depth < 0){
      return null;
    }

    var oldStart = divide(add(multiply(newStart, 2), newEnd), 3);
    var oldEnd = divide(add(multiply(newEnd, 2), newStart), 3);
    var middleSegment = divide(add(newStart, newEnd), 2);
    var point1 = divide(minus(middleSegment, newStart), length(middleSegment, newStart));
    var point2 = [point1[1], -point1[0]];
    var angle = add(multiply(point2, Math.sqrt(3)/6 * length(newEnd, newStart)), middleSegment);

    line = new Line(newStart, newEnd, "black");
    lines.push(line);

    if (depth !== 0) { // adds white lines to overlap the center length of the previous black line
      line = new Line(oldStart, oldEnd, "white");
      lines.push(line);
    }

    // recursive step on each new line
    koch(newStart, oldStart, depth-1);
    koch(oldStart, angle, depth-1);
    koch(angle, oldEnd, depth-1);
    koch(oldEnd, newEnd, depth-1);
}

function multiply(v, num){
    return [v[0]*num, v[1]*num]; // returning tuples works in JS but not Solidity
}

function divide(v, num){
    return [v[0]/num, v[1]/num];
}

function add(a, b){
    return [a[0]+b[0], a[1]+b[1]];
}

function minus(a, b){
    return [a[0]-b[0], a[1]-b[1]];
}

function length(a, b){
    return Math.sqrt(Math.pow(a[0] - b[0],2) +
                     Math.pow(a[1] - b[1],2));
}

function DrawLine(a, b, c){ // draw lines
    context.beginPath();
    context.strokeStyle = c;
    if (c === "white") {
      context.lineWidth=3; // white line needs to overlap
    } else {
      context.lineWidth=1;
    }
    context.moveTo(a[0], a[1]);
    context.lineTo(b[0], b[1]);
    context.stroke();
    context.closePath();
}

