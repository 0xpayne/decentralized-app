
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// get this from running $ solcjs --abi koch.sol, then $ more koch_sol_koch.abi
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"level","type":"uint8"}],"name":"giveStrings","outputs":[{"components":[{"name":"a","type":"uint32[]"},{"name":"b","type":"uint32[]"},{"name":"c","type":"string"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"A","type":"uint32[]"},{"name":"B","type":"uint32[]"},{"name":"depth","type":"uint256"}],"name":"koch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"level","type":"uint8"}],"name":"addlevel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"levels","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"kochCurve","outputs":[{"name":"c","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"passedLevels","type":"uint8[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
Contract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = Contract.at('0x2a9c1d265d06d47e8f7b00ffa987c9185aecf672');

/* Commands for Cmd Line

abiDefinition = JSON.parse(compiledCode.contracts[':Koch'].interface)
Contract = new web3.eth.Contract(abiDefinition)
byteCode = compiledCode.contracts[':Koch'].bytecode;
Contract.deploy({data: byteCode, arguments: []});
levelList = [];
*/

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

function init() {
    var canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d"); 
    context.beginPath();
    context.stroke();
    context.closePath();
    lines = contractInstance.giveStrings(x);
    context.clearRect(0,0,500,500);
    for (var i = 0; i < lines.length; i++) {
      DrawLine(lines[i].a, lines[i].b, lines[i].c);
    }
}

function DrawLine(a, b, c) { // Draw each line in our Line[]
    context.beginPath();
    context.strokeStyle = c;
    if (c === "white") {
      context.lineWidth = 3; // needs to overlap
    } else {
      context.lineWidth = 1;
    }
    context.moveTo(a[0], a[1]);
    context.lineTo(b[0], b[1]);
    context.stroke();
    context.closePath();
}
      

