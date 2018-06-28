#### 使用：

```
npm i logic-canvas
```
##### 绘制一个指定原点的坐标系
```
import MyCanvas from "./MyCanvas";
    let canvas = new MyCanvas(1200, 600, "canvas", $);
    canvas.clearWin();//清屏填充
    var COO = {x: 360, y: 400};//坐标原点
    canvas.drawCoord(COO)
```
