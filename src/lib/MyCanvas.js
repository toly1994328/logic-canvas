import Polygon from "./Polygon"
import Norm from "./Norm"

/**
 * 初始画布，绘制图形
 * @param winW 画布宽
 * @param winH 画布高
 * @param canvasId 画布dom中的id
 * @constructor
 */
var MyCanvas = function (winW, winH, canvasId) {

    this.winW = winW;
    this.winH = winH;
    this.canvasId = canvasId;

    var el = document.createElement("canvas");
    el.setAttribute("id", this.canvasId);
    el.setAttribute("width", this.winW);
    el.setAttribute("height", this.winH);
    el.innerHTML = " 当前浏览器不支持Canvas，请更换浏览器后再试";
    var body = document.getElementsByTagName("body");
    body[0].appendChild(el);

    this.ctx = this.getCtx();//绘制context对象

};

MyCanvas.prototype = {
    ////////////////////////////////////////////////////////////
    ////////////基础设置
    ////////////////////////////////////////////////////////////

    /**
     * 获取绘制上下文
     * @returns {CanvasRenderingContext2D | WebGLRenderingContext} 绘制上下文
     */
    getCtx: function () {
        var canvas = document.getElementById(this.canvasId);
        var context = canvas.getContext("2d");
        this.ctx = context;
        return context;
    },

    /**
     * 设置画布尺寸
     * @param winW 画布宽
     * @param winH 画布高
     */
    setWin: function (winW, winH) {
        this.winW = winW;
        this.winH = winH;
        this.getCanvas.height = winH;
        this.getCanvas().width = winW;
    },

    /**
     * 获取当前对象创建的canvas标签
     * @returns {*} canvas标签的dom节点
     */
    getCanvas: function () {
        return document.getElementById(this.canvasId);
    },

    /**
     * 设置清屏
     * @param color
     */
    clearWin: function (color = "#FAF6FC") {
        var ctx = this.ctx;
        this.setCtx({"fs": color});
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    getRandomColor: function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var a = Math.random() * 0.5 + 0.5;
        var color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        return color;
    },

    ////////////////////////////////////////////////////////////
    ////////////核心函数↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    ////////////////////////////////////////////////////////////
    /**
     * 为ctx设置状态
     * @param configJson 设置的参数json串
     */
    setCtx: function (configJson) {
        var ctx = this.ctx;
        //设置线宽：代号：lw 如{lw:1},代表线宽为1
        ctx.lineWidth = configJson["b"] || 1;
        //设置线条样式
        ctx.strokeStyle = configJson["ss"] || "#000";
        //设置填充样式
        ctx.fillStyle = configJson["fs"] || "#0019FF";
        //设置线的连接模式
        ctx.lineJoin = configJson["lj"] || "round";
        //设置线的顶头模式
        ctx.lineCap = configJson["lc"] || "round";
        //设置文字样式信息 m-toly：2018-6-15 10:07:58
        ctx.font = configJson["font"] || "40px Arial";
        //设置水平对齐方式 m-toly：2018-6-15 10:07:58
        ctx.textAlign = configJson["ta"] || "left";
        //设置垂直对齐方式 m-toly：2018-6-15 10:07:58
        ctx.textBaseline = configJson["tb"] || "top";
        //设置阴影颜色
        ctx.shadowColor = configJson["sc"] || "gray";
        //设置阴影X偏移
        ctx.shadowOffsetX = configJson["sox"] || "0";
        //设置阴影Y偏移
        ctx.shadowOffsetY = configJson["soy"] || "0";
        //设置阴影模糊值
        ctx.shadowBlur = configJson["sb"] || "0";
        //设置全局透明度
        ctx.globalAlpha = configJson["ga"] || "1";
        //设置全局透明度
        ctx.globalCompositeOperation = configJson["gco"] || "source-over";


    },

    ////////////////////////////////////////////////////////////
    ////////////绘制入口
    ////////////////////////////////////////////////////////////
    /**
     * save和restore的中间部分（为了保证绘画时状态的保持，与结束后的回复）
     * m-toly:2018-6-16 13:03:44 将s2r和b2c合并，意识到保存画板状态和开启路径是每次绘制的基础
     * @param callback
     */
    s2rb2c: function (callback, configJson) {
        this._s2rb2c(true, callback, configJson)
    },

    s2rb2: function (callback, configJson) {
        this._s2rb2c(false, callback, configJson)
    },
    /**
     *
     * @param isclose 是否闭合
     * @param callback 回调
     * @param configJson 绘制配置项 x：距左顶X y:距左顶Y rot：旋转角度(弧度制) b:边线宽 sx:x缩放 sy:y缩放
     * @private
     */
    _s2rb2c: function (isclose, callback, configJson) {
        var self = this;
        var ctx = this.ctx;
        ctx.save();
        var p = configJson["p"] || {x: 0, y: 0};
        var a = configJson["a"] || {x: 0, y: 0};
        var rot = configJson["rot"] || 0;

        var x = p.x;
        var y = p.y;


        var border = configJson["b"] || 1;
        //---增加缩放字段---m-toly:2018-6-15 08:43:53
        var sx = configJson["sx"] || 1;
        var sy = configJson["sy"] || 1;


        var coo = configJson["coo"];
        if (coo !== undefined) {
            x = coo.x + x;
            y = coo.y - p.y;
            p.x = x;
            p.y = y;
        }

        // configJson["b"] = border / sx;//放大时保持边线宽：//m-end
        //将图形的移动和旋转从绘制图形时分离
        //减少图形绘制复杂度和代码可读性
        ctx.translate(x + border, y + border);

        ctx.translate(a.x, a.y);
        ctx.rotate(rot);
        ctx.translate(-a.x, -a.y);

        ctx.scale(sx, sy);//---m-toly:2018-6-15 08:43:53

        ctx.beginPath();
        if (callback && typeof(callback) === "function") {
            self.setCtx(configJson);
            callback(ctx);//通过回调传递ctx对象：m-toly:2018-6-15 09:18:08
        }
        if (isclose) {
            ctx.closePath();//会封闭图形
        }
        if (configJson["fs"] || (configJson["fs"] === undefined)) {
            ctx.fill();//当fs不为false时填充
        }
        if (configJson["ss"] || ((configJson["ss"] === undefined))) {
            ctx.stroke();//绘制
        }
        ctx.restore();
    },

    ////////////////////////////////////////////////////////////
    ////////////图形绘制
    ////////////////////////////////////////////////////////////
    /**
     * 绘制矩形
     * @param configJson 配置信息
     */
    drawRect: function (configJson) {
        var self = this;
        self.s2rb2c(function (ctx) {
            Polygon.rectPath(ctx, configJson)
        }, configJson);
    },


    /**
     * 绘制n角星
     * @param configJson 配置信息
     */
    drawNStar: function (configJson) {
        this.s2rb2c(function (ctx) {
            Polygon.starPath(ctx, configJson);
        }, configJson);
    },

    /**
     * 绘制正n多边形
     * @param configJson 配置信息
     */
    drawRegularPolygon: function (configJson) {
        var self = this;
        this.s2rb2c(function (ctx) {
            Polygon.regularPolygonPath(ctx, configJson);
        }, configJson);
    },

    /**
     * 绘制正n角星
     * @param configJson 配置信息
     */
    drawRegularStar: function (configJson) {
        var self = this;
        this.s2rb2c(function (ctx) {
            Polygon.regularStarPath(ctx, configJson);
        }, configJson);
    },
    /**
     * 绘制月亮
     * @param configJson 配置信息
     */
    drawMoon: function (configJson) {
        var self = this;
        this.s2rb2c(function (ctx) {
            Polygon.moonPath(ctx, configJson);
        }, configJson);
    },
    /**
     * 绘制圆
     * @param configJson 配置信息
     */
    drawArc: function (configJson, dirc) {
        var self = this;
        this.s2rb2c(function (ctx) {
            Polygon.arcPath(ctx, configJson, dirc);
        }, configJson);
    },
    /**
     * 绘制点
     * @param configJson
     */
    drawPoint: function (configJson) {
        var self = this;
        this.s2rb2c(function (ctx) {
            Polygon.pointPath(ctx, configJson);
            console.log(configJson);
        }, configJson);
    },

    drawPointPolar: function (configJson) {
        var self = this;
        this.s2rb2c(function (ctx) {
            Polygon.pointPathPolar(ctx, configJson);
        }, configJson);
    },

    /**
     * 绘直线
     * @param configJson 配置信息
     */
    drawLine: function (configJson) {
        var self = this;
        this.s2rb2(function (ctx) {
            Polygon.linePath(ctx, configJson);
        }, configJson);
    },
    /**
     * 绘直线
     * @param configJson 配置信息
     */
    drawLine2: function (configJson) {
        var self = this;
        this.s2rb2(function (ctx) {
            Norm.line(ctx);
        }, configJson);
    },
    /**
     * 通过点集绘制直线
     * @param linePos
     */
    drawLines: function (linePos) {
        for (var i = 0; i < linePos.length - 1; i++) {
            this.drawLine({
                x0: linePos[i].x,
                y0: linePos[i].y,
                x1: linePos[i + 1].x,
                y1: linePos[i + 1].y,
            });
        }
    },
    /**
     * 绘制三角形
     * @param configJson
     */
    drawTrg: function (configJson) {
        var self;
        this.s2rb2c(function (ctx) {
            self = Polygon.trgPath(ctx, configJson);
        }, configJson);
        return self;
    },
    /**
     * 绘制直角坐标系
     * @param coo 坐标原点
     * @param line_h 小线高
     * @param step 小线间隔（像素）
     */
    drawCoord: function (coo, line_h = 2, step = 10) {
        var COO = coo;//坐标原点
        var LINE_H = line_h;//小线高
        var STEP = step;//小线间隔（像素）
        this.drawLine({
            p0: {x: -COO.x, y: 0},
            p1: {x: this.winW - COO.x, y: 0},
            coo: COO,
        });

        for (let i = 1; i < this.winW / STEP; i++) {
            this.drawLine({
                p0: {x: -COO.x + STEP * i, y: 0},
                p1: {x: -COO.x + STEP * i, y: LINE_H},
                coo: COO,
            });
        }

        this.drawLine({
            p0: {x: 0, y: -COO.y},
            p1: {x: 0, y: -COO.y + this.winH},
            coo: COO,
        });

        for (let i = 1; i < this.winH / STEP; i++) {
            this.drawLine({
                p0: {x: 0, y: -(COO.y - this.winH + STEP * i)},
                p1: {x: LINE_H, y: -(COO.y - this.winH + STEP * i)},
                coo: COO,
            })
        }

        this.drawTrg(
            {
                p0: ({x: -5, y: COO.y - 12}),
                p1: ({x: 5, y: COO.y - 12}),
                p2: ({x: 0, y: COO.y}),
                coo: COO,
                ss: false,
                fs: "#000"
            });

        this.drawTrg(
            {
                p0: ({x: this.winW - COO.x - 12, y: 5}),
                p1: ({x: this.winW - COO.x - 12, y: -5}),
                p2: ({x: this.winW - COO.x, y: 0}),
                coo: COO,
                ss: false,
                fs: "#000"
            });
    },

    /**
     * 绘制填充文字
     * @param configJson
     */
    setText: function (configJson, isFill) {
        var ctx = this.getCtx();
        this.setCtx(configJson);
        var txt = configJson["txt"] || "";
        var p = configJson["p"] || {x: 0, y: 0};
        var x = p.x;
        var y = p.y;

        if (isFill === undefined) {
            ctx.fillText(txt, x, y);
            ctx.strokeText(txt, x, y);
        }
        if (isFill) {
            ctx.fillText(txt, x, y);
        } else {
            ctx.strokeText(txt, x, y);
        }
        return ctx.measureText(txt).width;
    },

    clip: function (callback) {
        var self = this;
        this.s2rb2(function () {
            if (callback && typeof(callback) === "function") {
                callback(self.ctx);
            }
        })
    },

    ////////////////////////////////////////////////////////////
    ////////////事件处理
    ////////////////////////////////////////////////////////////
    onEvent: function (style, callback) {
        var self = this;
        $(this.getCanvas()).on(style, function (e) {
            e.preventDefault();
            var x = e.pageX - $(self.getCanvas()).offset().left;//相对于canvas左上X
            var y = e.pageY - $(self.getCanvas()).offset().top;//相对于canvas左上X
            if (callback && typeof(callback) === "function") {
                callback(x, y);
            }
        });
    },

    runGo: function (callback, fps) {
        var timer = null;
        timer = setInterval(function () {
            if (callback && typeof(callback) === "function") {
                callback(timer);
            }
        }, fps);
    },
};

export default MyCanvas;
