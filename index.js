
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotes","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x2a9c1d265d06d47e8f7b00ffa987c9185aecf672');

function buildCurve() {
  candidateName = $("#candidate").val();
  contractInstance.buildCurve(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotes.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotes.call(name).toString();
    $("#" + candidates[name]).html(val);
  }
}); 

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

var x;
var lines = [];

function Line(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

slider.oninput = function() {
    x = this.value;
    init();
}

function init() {
    
    var canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d"); 
    
    context.beginPath();
    context.stroke();
    context.closePath();
    lines = [];
    context.clearRect(0,0,500,500);
    
    
    koch([50,150], [500,150],x);
    koch([270,490], [50,150],x);
    koch([500,150],[270,490],x);
    for (var i = 0; i < lines.length; i++) {
      DrawLine(lines[i].a, lines[i].b, lines[i].c);
    }
}

function koch(A, B, depth) { // draw koch snowflake recursively

    if (depth < 0){
        return null;
    }

    var C = divide(add(multiply(A, 2), B), 3);
    var D = divide(add(multiply(B, 2), A), 3);
    var F = divide(add(A, B), 2);
    
    var V1 = divide(minus(F, A), length(F, A));
    var V2 = [V1[1], -V1[0]];

    var E = add(multiply(V2, Math.sqrt(3)/6 * length(B, A)), F);

    line = new Line(A, B, "black");
    lines.push(line);

    if (depth !==0){
      for (var i=0; i<10; i++)
        line = new Line(C, D, "white");
        lines.push(line);
    }
    
    koch(A, C, depth-1);
    koch(C, E, depth-1);
    koch(E, D, depth-1);
    koch(D, B, depth-1);

}

function multiply(v, num){
    return [v[0]*num, v[1]*num];
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

function DrawLine(a, b, c){
    context.beginPath();
    context.strokeStyle = c;
    if (c === "white") {
      context.lineWidth=3; // needs to overlap
    } else {
      context.lineWidth=1;
    }
    context.moveTo(a[0], a[1]);
    context.lineTo(b[0], b[1]);
    context.stroke();
    context.closePath();
}
      

