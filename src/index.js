import MyCanvas from "./lib/MyCanvas";

let canvas = new MyCanvas(1200, 600, "canvas");
canvas.clearWin();
var COO = {x: 360, y: 400};//坐标原点
canvas.drawCoord(COO);


//绘制一个角个数为6，外接圆半径100，内接圆半径55，位置相对于左上角{x: 360, y: 400}处
//描边颜色"#D9ABF8",填充颜色"#F0F674"的多角形
canvas.drawNStar({
    num: 6, R: 100, r: 55, p: COO,
    ss: "#D9ABF8", fs: "#F0F674"
});

//绘制一个宽100，高50，圆角半径10，位置相对于左上角（200,200）处
//描边颜色"#D9ABF8",不填充,线宽5px的长方形
canvas.drawRect({
    w: 100, h: 50, ra: 10, p: {x: 200, y: 200},
    ss: "#D9ABF8", fs: false, b: 5
});