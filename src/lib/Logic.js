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

class Law {
    /**
     * 已知边及其对角，求另一已知角所对边，第一参对应所求边
     * @param degA
     * @param degB
     * @param b
     * @returns {number|*}
     */
    static sinGetL(degA, degB, b,) {
        return b * Math.sin(degA) / Math.sin(degB);

    }

    /**
     * 已知三边，第一参对应所求角
     * @param a
     * @param b
     * @param c
     * @returns {number}
     */
    static cosGetDeg(b, a, c) {
        var cosb = (a * a + c * c - b * b) / (2 * a * c);
        var degB = Math.acos(cosb);

        return degB;
    }

    /**
     * 已知两边及夹角，用余弦定理求第三边,第一参对应所求边
     * @param degC  已知角度数
     * @param a 已知角一边长
     * @param b 已知角一边长
     * @param isDeg 是否是角度制
     * @returns number
     */
    static cosGetL(degC, a, b) {
        return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(degC));
    }
}

export default Logic;