class Logic {

    /**
     * 弧度制化为角度制
     * @param rad 弧度
     * @returns {number} 角度
     */
    static deg(rad) {
        return rad * 180 / Math.PI;
    }

    /**
     * 角度制化为弧度制
     * @param deg 角度
     * @returns {number} 弧度
     */
    static rad(deg) {
        return deg * Math.PI / 180;
    }

    /**
     * 两点间夹角，以p0为旋转点 ，逆时针度数
     * @param p0 第一点
     * @param p1 第二点
     * @returns {number}
     */
    static angleOf2Pos(p0, p1) {
        return Math.atan((p1.x - p0.x) / (p1.y - p0.y));
    }

    /**
     * 两点间距离函数
     * @returns number
     * @param p0 第一点
     * @param p1 第二点
     */
    static disPos2d(p0, p1) {
        return Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y));
    }


    /**
     * 一元二次函数解
     * @param a 二次项系数
     * @param b 一次项系数
     * @param c 常数项参数
     * @returns {{x1: number, x2: number}}
     */
    static getOyTc(a, b, c) {
        var delta = b * b - 4 * a * c;
        if (delta >= 0) {
            var x1 = -b / (2 * a) + Math.sqrt(delta) / (2 * a);
            var x2 = -b / (2 * a) - Math.sqrt(delta) / (2 * a);
        } else {
            return;
        }
        return {x1: x1, x2: x2}
    }

    /**
     * 判断参数是否存在
     */
    static isExist(...args) {
        //ES5
        var isExist = true;
        args.forEach(function (arg) {
            if (arg === undefined) {
                isExist = false;
                return;
            }
        });
        return isExist;
    }
}

export default Logic;