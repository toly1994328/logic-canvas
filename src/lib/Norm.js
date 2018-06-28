class Norm {

    static line(ctx) {
        var _p0 = {x: 0, y: 0};
        var _p1 = {x: 100, y: 0};
        ctx.moveTo(_p0.x, _p0.y);
        ctx.lineTo(_p1.x, _p1.y);
    }

    static trg(ctx, info) {
        var rate = info.rate;
        var ang0 = info.ang0;
        var ang1 = info.ang1;

        let triangle = Parse.triangle({
            degA: ang0,
            degB: ang1,
            c: 1
        });

        console.table(triangle);

        var _p0 = {x: 0, y: 0};
        var _p1 = {x: 1 * rate, y: 0};
        var _p2 = {x: triangle.b * rate * Math.cos(ang0), y: triangle.b * rate * Math.sin(ang0)};
        console.log(_p2);
        var coo = info["coo"];
        ctx.moveTo(_p0.x + coo.x, coo.y - _p0.y);
        ctx.lineTo(_p1.x + coo.x, coo.y - _p1.y);
        ctx.lineTo(_p2.x + coo.x, coo.y - _p2.y);
    }
}