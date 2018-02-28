pragma solidity ^0.4.21;
contract Koch {
    
    struct Line {
        uint32[] a;
        uint32[] b;
        string c;
    }
    
    mapping(uint => Line[]) public kocholdStarturve;
    
    uint8[] public levels;
    Line[] lines;
    
    function Koch(uint8[] passedLevels) public {
        levels = passedLevels;
    }
    
    function addlevel(uint8 level) public {
        levels.push(level);
    }
    
    function giveStrings(uint8 level) public returns (Line[]) {
        uint32[] memory newStart; // need to initialize and declare each of them because Solidity doesn't allow passing memory data types to functions
        uint32[] memory newEnd;
        uint32[] memory oldStart;
        uint32[] memory newStart1;
        uint32[] memory newEnd1;
        uint32[] memory oldStart1;
        newStart[0] = 50000;  // Solidity does not yet support floating point or double type variables, only ints.
        newStart[1] = 150000; // To get around this, we're using uint32 data types multiplied by 1000 and will divide
        newEnd[0] = 270000; // them by 1000 after converting them to floats in the JS.
        newEnd[1] = 490000;
        oldStart[0] = 500000;
        oldStart[1] = 150000;
        newStart1[0] = 50000;
        newStart1[1] = 150000;
        newEnd1[0] = 270000;
        newEnd1[1] = 490000;
        oldStart1[0] = 500000;
        oldStart1[1] = 150000;
        koch(newStart, newStart1,level);
        koch(newEnd, newEnd1,level);
        koch(oldStart, oldStart1,level);
        return lines;
    }
    
    function koch(uint32[] newStart, uint32[] newEnd, uint depth) public { // draw koch curve recursively

        // base case 
        if (depth < 0){
            return;
        }

        uint32[] memory oldStart;
        oldStart[0] = ((newStart[0]*2)+newEnd[0])/3;
        oldStart[1] = ((newStart[1]*2)+newEnd[1])/3;
        uint32[] memory oldEnd;
        oldEnd[0] = ((newEnd[0]*2)+newStart[0])/3;
        oldEnd[1] = ((newEnd[1]*2)+newStart[1])/3;
        uint32[] memory F;
        F[0] = (newStart[0]+newEnd[0])/2;
        F[1] = (newStart[1]+newEnd[1])/2;
        
        uint32[] memory V1;
        V1[0] = (F[0] - newStart[0])/(sqrt(((F[0] - newStart[0])*(F[0] - newStart[0])) + ((F[1] - newStart[1])*(F[1] - newStart[1]))));
        V1[1] = (F[1] - newStart[1])/(sqrt(((F[0] - newStart[0])*(F[0] - newStart[0])) + ((F[1] - newStart[1])*(F[1] - newStart[1]))));
        
        uint32[] memory V2;
        V2[0] = V1[1];
        V2[1] = -V1[0];
        
        uint32[] memory angle;
        angle[0] = (V2[0]*(sqrt(3)/6)*(sqrt(((newEnd[0] - newStart[0])*(newEnd[0] - newStart[0])) + ((newEnd[1] - newStart[1])*(newEnd[1] - newStart[1]))))) + (F[0]);
        angle[1] = (V2[1]*(sqrt(3)/6)*(sqrt(((newEnd[0] - newStart[0])*(newEnd[0] - newStart[0])) + ((newEnd[1] - newStart[1])*(newEnd[1] - newStart[1]))))) + (F[1]);
        
        Line memory line;
        line.a = newStart;
        line.b = newEnd;
        line.c = "black";
        lines.push(line);
    
        if (depth != 0){
          for (int i = 0; i < 10; i++)
            Line memory line2;
            line2.a = oldStart;
            line2.b = oldEnd;
            line2.c = "white";
            lines.push(line2);
        }
        
        // recursive step on each new line
        koch(newStart, oldStart, depth-1);
        koch(oldStart, angle, depth-1);
        koch(angle, oldEnd, depth-1);
        koch(oldEnd, newEnd, depth-1);
    }

    function sqrt(uint32 x) private pure returns (uint32 y) {
        uint32 z = (x+1)/2;
        y = x;
        while (z < y) {
            y = z;
            z = (x/z+z)/2;
        }
    }
}
