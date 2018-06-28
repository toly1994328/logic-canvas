import MyCanvas from "./lib/MyCanvas";

let canvas = new MyCanvas(1200, 600, "canvas");
canvas.clearWin();
var COO = {x: 360, y: 400};//坐标原点
canvas.drawCoord(COO);
//
//
// //绘制一个角个数为6，外接圆半径100，内接圆半径55，位置相对于左上角{x: 360, y: 400}处
// //描边颜色"#D9ABF8",填充颜色"#F0F674"的多角形
// canvas.drawNStar({
//     num: 6, R: 100, r: 55, p: COO,
//     ss: "#D9ABF8", fs: "#F0F674"
// });
//
// //绘制一个宽100，高50，圆角半径10，位置相对于左上角（200,200）处
// //描边颜色"#D9ABF8",不填充,线宽5px的长方形
// canvas.drawRect({
//     w: 100, h: 50, ra: 10, p: {x: 200, y: 200},
//     ss: "#D9ABF8", fs: false, b: 5
// });

// for (let i = 0; i < 2000; i += 0.1) {
//     myCanvas.drawPointPolar({
//         R: 0.5,
//         c: (1 - Math.sin(Logic.rad(i))) * 100,
//         ang: Logic.rad(i),
//         coo: COO,
//         fs: "#f00"
//     });
// }

//绘制给定起点,长度，角度的直线（长度和角度30ms加1）,起点为坐标原点
var count = 0;
canvas.runGo(function (timer) {
    canvas.drawLine({
        p0: {x: 0, y: 0},
        c: count,
        ang: count / 180 * Math.PI,
        ss: canvas.getRandomColor(),//获取随机色
        coo: COO,//设置坐标系
    });
    count++;
    if (count >= 360 + 90) {
        clearInterval(timer);
    }
}, 30);