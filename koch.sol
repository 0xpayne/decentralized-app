pragma solidity ^0.4.20;
contract Koch {
    
    struct Line {
        uint32[] a;
        uint32[] b;
        string c;
    }
    
    mapping(uint => Line[]) public kochCurve;
    
    uint8[] public levels;
    Line[] lines;
    
    function Koch(uint8[] passedLevels) public {
        levels = passedLevels;
    }
    
    function addlevel(uint8 level) public {
        levels.push(level);
    }
    
    function giveStrings(uint8 level) public returns (Line[]) {
        uint32[] memory A;
        uint32[] memory B;
        uint32[] memory C;
        uint32[] memory A1;
        uint32[] memory B1;
        uint32[] memory C1;
        A[0] = 50000;
        A[1] = 150000;
        B[0] = 270000;
        B[1] = 490000;
        C[0] = 500000;
        C[1] = 150000;
        A1[0] = 50000;
        A1[1] = 150000;
        B1[0] = 270000;
        B1[1] = 490000;
        C1[0] = 500000;
        C1[1] = 150000;
        koch(A, A1,level);
        koch(B, B1,level);
        koch(C, C1,level);
        return lines;
    }
    
    function koch(uint32[] A, uint32[] B, uint depth) public { // draw koch snowflake recursively
        
        if (depth < 0){
            return;
        }
      
        uint32[] memory C;
        C[0] = ((A[0]*2)+B[0])/3;
        C[1] = ((A[1]*2)+B[1])/3;
        uint32[] memory D;
        D[0] = ((B[0]*2)+A[0])/3;
        D[1] = ((B[1]*2)+A[1])/3;
        uint32[] memory F;
        F[0] = (A[0]+B[0])/2;
        F[1] = (A[1]+B[1])/2;
        
        uint32[] memory V1;
        V1[0] = (F[0] - A[0])/(sqrt(((F[0] - A[0])*(F[0] - A[0])) + ((F[1] - A[1])*(F[1] - A[1]))));
        V1[1] = (F[1] - A[1])/(sqrt(((F[0] - A[0])*(F[0] - A[0])) + ((F[1] - A[1])*(F[1] - A[1]))));
        
        uint32[] memory V2;
        V2[0] = V1[1];
        V2[1] = -V1[0];
        
        uint32[] memory E;
        E[0] = (V2[0]*(sqrt(3)/6)*(sqrt(((B[0] - A[0])*(B[0] - A[0])) + ((B[1] - A[1])*(B[1] - A[1]))))) + (F[0]);
        E[1] = (V2[1]*(sqrt(3)/6)*(sqrt(((B[0] - A[0])*(B[0] - A[0])) + ((B[1] - A[1])*(B[1] - A[1]))))) + (F[1]);
        
        Line memory line;
        line.a = A;
        line.b = B;
        line.c = "black";
        lines.push(line);
    
        if (depth != 0){
          for (int i=0; i<10; i++)
            Line memory line2;
            line2.a = C;
            line2.b = D;
            line2.c = "white";
            lines.push(line2);
        }
        
        koch(A, C, depth-1);
        koch(C, E, depth-1);
        koch(E, D, depth-1);
        koch(D, B, depth-1);
    }

    function sqrt(uint32 x) private pure returns (uint32 y) {
        uint32 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}