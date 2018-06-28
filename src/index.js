import MyCanvas from "./lib/MyCanvas";

let canvas = new MyCanvas(1200, 600, "canvas");
canvas.clearWin();
var COO = {x: 360, y: 400};//坐标原点
canvas.drawCoord(COO);
