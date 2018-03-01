# Decentralized Application Playground
Introducing myself to decentralized applications using Ethereum. An objective of this will be to leverage distributed computing for self-similar shapes, and decentralized storage for results stashing, as an exercise to get a sense of how blockchain works. The mapping is degree <i>n</i> (int) => Line Positions (Line[], where Line is a struct containing ([int x1, int y1]), ([int x2, int y2]), and (string color)).

Inspiration for this particular function comes from a CS 106B assignment written by Keith Schwarz - recursively drawing a Sierpinski triangle. Computation becomes relatively expensive on my computer at <i>n</i> > 7 (rendering time is O(4<sup><i>n</i></sup>)).

Pure JS functionality is in koch.js; index.js utilizes the smart contract from koch.sol. Contract functionality is in progress.

Output should look like this: 

<p align="center">
  <img src="https://storage.googleapis.com/imageexamples/koch-img.png" width=50%/>
</p>
