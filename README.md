#### 入门使用：
##### 添加依赖
```
npm i logic-canvas
```
##### 在src/index.js下：绘制一个指定原点的坐标系
```
//引入依赖，注意相对路径
import MyCanvas from "../node_modules/logic-canvas/src/lib/MyCanvas";
let canvas = new MyCanvas(1200, 600, "canvas");//创建一个id为canvas，宽1200px,高600px的画布
canvas.clearWin();//清屏填充
var COO = {x: 360, y: 400};//坐标原点
canvas.drawCoord(COO);//绘制坐标系
```
##### 绘制n角星

```
//绘制一个角个数为6，外接圆半径100，内接圆半径55，位置相对于左上角{x: 360, y: 400}处
//描边颜色"#D9ABF8",填充颜色"#F0F674"的多角形
canvas.drawNStar({
    num: 6, R: 100, r: 55, p: COO,
    ss: "#D9ABF8", fs: "#F0F674"
});
```
##### 绘制长方形

```
//绘制一个宽100，高50，圆角半径10，位置相对于左上角（200,200）处
//描边颜色"#D9ABF8",不填充,线宽5px的长方形
canvas.drawRect({
    w: 100, h: 50, ra: 10, p: {x: 200, y: 200},
    ss: "#D9ABF8", fs: false, b: 5
});
```
![image](http://a2.qpic.cn/psb?/V118BZ5R26fcwl/PV4OZOfiT2v4VFdMKpC*BTSer8ev1URwQkTOE5WUyHo!/b/dFkAAAAAAAAA&ek=1&kp=1&pt=0&bo=qgPrAQAAAAADF3E!&tl=1&vuin=2722448703&tm=1530147600&sce=60-2-2&rf=viewer_4)
##### 绘制直线
```
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
```
![image](http://m.qpic.cn/psb?/V118BZ5R26fcwl/Fm53nOYkD8SggeqnzIlII3wOd1*318XwqGvIvhOQ1JY!/b/dDIBAAAAAAAA&bo=WAJBAQAAAAACR3k!&rf=viewer_4)

---

使用点集绘制曲线（例：极坐标下，绘制笛卡尔心形曲线）
```
for (let i = 0; i < 2000; i += 0.1) {
    canvas.drawPointPolar({
        R: 0.5,//点半径
        c: (1 - Math.sin(i / 180 * Math.PI)) * 100,//极坐标下长度
        ang: i / 180 * Math.PI,//极坐标下角度
        coo: COO,
        fs: "#f00"
    });
}
```
![image](http://m.qpic.cn/psb?/V118BZ5R26fcwl/XTdCgkkilU4zpdTshazMMnmyT4M4EWOakmEDukh97FQ!/b/dC4BAAAAAAAA&bo=FAT1AQAAAAADF9Y!&rf=viewer_4)

---
#### 根据三点绘制三角形：canvas.drawTrg

```
var count = 0;
canvas.runGo(function (timer) {
    canvas.clearWin();
    canvas.drawCoord(COO);
    let drawTrg = canvas.drawTrg({
        p0: {x: 0, y: 0},
        p1: {x: count, y: 100},
        p2: {x: 200, y: count/2},
        ss:false,
        coo: COO
    });
    count++;
    if (count >= 360 + 90) {
        clearInterval(timer);
    }
}, 10);
```
![image](http://m.qpic.cn/psb?/V118BZ5R26fcwl/hn6DrydxBfnTfJ.6gBywcMzbE0ae1dY3KwV*g1lX4sM!/c/dAgBAAAAAAAA&bo=WAIrAQAAAAACB1M!&rf=viewer_4)

#### n角星的角数不断增大时：
```
var count = 0;
canvas.runGo(function (timer) {
    canvas.clearWin();
    canvas.drawCoord(COO);
    canvas.drawNStar({
        num: count, R: 100, r: 55,p:{x:100,y:0},
        ss: false, fs: "#F0F674"
    });
    count++;
    if (count >= 200) {
        clearInterval(timer);
    }
}, 30);
```
![image](http://m.qpic.cn/psb?/V118BZ5R26fcwl/lJ4ji9XbWEB0GhG4Vl.DYVVwLOptoHtPqjO2MNvoMSE!/c/dFoAAAAAAAAA&bo=WAIrAQAAAAACB1M!&rf=viewer_4)