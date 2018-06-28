import Parse from "./Parse";
import Logic from "./Logic";

class Polygon {
    static pointPath(ctx, configJson) {

        var R = configJson["R"] || 1;
        configJson["ss"] = false;
        var coo = configJson["coo"] || {x: 0, y: 0};
        var p = configJson["p"] || {x: 0, y: 0};
        ctx.arc(p.x + coo.x - p.x, coo.y - p.y - p.y, R, 0, 2 * Math.PI);

    }

    static pointPathPolar(ctx, configJson) {
        var ang = configJson["ang"] || 0;
        var c = configJson["c"] || 0;
        var p = {x: c * Math.cos(ang), y: c * Math.sin(ang)};


        var R = configJson["R"] || 1;
        configJson["ss"] = false;
        var coo = configJson["coo"] || {x: 0, y: 0};
        ctx.arc(p.x + coo.x, coo.y - p.y, R, 0, 2 * Math.PI);
    }

    static linePath(ctx, configJson) {

        var line = Parse.line(configJson);
        var coo = configJson["coo"];
        ctx.moveTo(line.p0.x + coo.x, coo.y - line.p0.y);
        ctx.lineTo(line.p1.x + coo.x, coo.y - line.p1.y);

    }

    static trgPath(ctx, configJson) {
        var p0 = configJson["p0"];
        var p1 = configJson["p1"];
        var p2 = configJson["p2"];
        var coo = configJson["coo"];

        var a = Logic.disPos2d(p1, p2);
        var b = Logic.disPos2d(p0, p2);
        var c = Logic.disPos2d(p0, p1);
        var triangle = Parse.triangle({a:a,b:b,c:c});
        if (triangle != false) {
            ctx.moveTo(p0.x + coo.x, coo.y - p0.y);
            ctx.lineTo(p1.x + coo.x, coo.y - p1.y);
            ctx.lineTo(p2.x + coo.x, coo.y - p2.y);
            return triangle;
        } else {
            console.log("无法组成三角形！");
        }




    }

    /**
     * 画矩形的路径
     * @param ctx
     * @param configJson w:宽 h:高 rad:圆角
     */
    static rectPath(ctx, configJson) {
        var width = configJson["w"] || 100;
        var height = configJson["h"] || 100;
        var radius = configJson["ra"] || 0;

        if (2 * radius > width || 2 * radius > height) {
            return;
        }
        ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
        ctx.lineTo(radius, height);
        ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
        ctx.lineTo(0, radius);
        ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
        ctx.lineTo(width - radius, 0);
        ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, 0);
    }

    //////////////////////////////////////////////////////
    //画星星的路径
    /////////////////////////////////
    static starPath(ctx, configJson) {
        var num = configJson["num"] || 5;
        var R = configJson["R"] || 100;
        var r = configJson["r"] || 50;
        for (var i = 0; i < num; i++) {
            var perDeg = 360 / num;
            var degA = perDeg / 2 / 2;
            var degB = 360 / (num - 1) / 2 - degA / 2 + degA;
            ctx.lineTo(Math.cos((degA + perDeg * i) / 180 * Math.PI) * R + R * Math.cos(degA / 180 * Math.PI),
                -Math.sin((degA + perDeg * i) / 180 * Math.PI) * R + R);
            ctx.lineTo(Math.cos((degB + perDeg * i) / 180 * Math.PI) * r + R * Math.cos(degA / 180 * Math.PI),
                -Math.sin((degB + perDeg * i) / 180 * Math.PI) * r + R);
        }
    }

    //////////////////////////////////////////////////////
    //画正n角星的路径
    /////////////////////////////////
    static regularStarPath(ctx, configJson) {

        var num = configJson["num"] || 5;
        var R = configJson["R"] || 100;
        var r = configJson["r"] || 50;

        if (num % 2 === 1) {
            var degA = 360 / num / 2 / 2;
            var degB = 180 - degA - 360 / num / 2;
        } else {
            var degA = 360 / num / 2;
            var degB = 180 - degA - 360 / num / 2;
        }
        r = R * Math.sin(degA / 180 * Math.PI) / Math.sin(degB / 180 * Math.PI);
        configJson["r"] = r;
        Polygon.starPath(ctx, configJson);
    }

    //////////////////////////////////////////////////////
    //画正n边形的路径
    /////////////////////////////////
    static regularPolygonPath(ctx, configJson) {
        var num, R, r;
        num = configJson["num"];
        R = configJson["R"];
        r = R * (Math.cos(360 / num / 2 / 180 * Math.PI));
        configJson["r"] = r;
        Polygon.starPath(ctx, configJson);
    }

    //////////////////////////////////////////////////////
    //画圆的路径
    /////////////////////////////////
    static arcPath(ctx, configJson, dirc) {
        var R = configJson["R"] || 100;
        ctx.arc(0, 0, R, 0, 2 * Math.PI, dirc);
    }

    //////////////////////////////////////////////////////
    //绘制月亮
    /////////////////////////////////
    static moonPath(ctx, configJson) {

        var w = configJson["w"] || 1.1;
        ctx.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
        ctx.moveTo(0, -1);
        // this.ctx.arcTo(w,0,0,1,this._dis(0,-1,w,0)/w)
        ctx.quadraticCurveTo(w, 0, 0, 1);
    }


}

export default Polygon;