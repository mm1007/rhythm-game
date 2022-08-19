class vec2 {
    x;
    y;

    /**
     * x,yから点ベクトルを作成
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 点ベクトルを足す
     * @param {vec2} b 
     */
    add(b) {
        let a = this;
        return new vec2(a.x + b.x, a.y + b.y);
    }

    /**
     * 点ベクトルを引く(aベクトルからbベクトルを引く)
     * @param {vec2} b 
     */
    sub(b) {
        let a = this;
        return new vec2(a.x - b.x, a.y - b.y);
    }

}

class vec2_line {

    begin;
    dir;

    /**
     * 位置ベクトルと方向ベクトルを指定し線分を作成します
     * @param {vec2} begin 位置ベクトル
     * @param {vec2} dir 方向ベクトル
     */
    constructor(begin, dir) {
        this.begin = begin;
        this.dir = dir;
    }

    static vec2_line(start, end) {
        return new vec2_line(start, end.sub(start));
    }

    intersection(b) {
        var a = this;

        if (abs(a.dir.x) < 0.01) a.dir.x = 0.01;
        if (abs(b.dir.x) < 0.01) b.dir.x = 0.01;

        var t1 = a.dir.y / a.dir.x;
        var t2 = b.dir.y / b.dir.x;
        var x1 = a.begin.x;
        var x2 = b.begin.x;
        var y1 = a.begin.y;
        var y2 = b.begin.y;

        var solveX = (t1 * x1 - t2 * x2 - y1 + y2) / (t1 - t2)
        var solveY = t1 * (solveX - x1) + y1;

        if (
            solveX > min(a.start.x, a.end.x) &&
            solveX < max(a.start.x, a.end.x) &&
            solveX > min(b.start.x, b.end.x) &&
            solveX < max(b.start.x, b.end.x)
        ) {
            return new vec2(solveX, solveY);
        } else {
            return null;
        }
    }

    get start() {
        return this.begin;
    }

    get end() {
        return this.begin.add(this.dir);
    }
}

class createQuad {
    vec1;
    vec2;
    vec3;
    vec4;
    mid;

    /**
     * 4つの点ベクトルから四角形を作成
     * @param {vec2} vec1 
     * @param {vec2} vec2 
     * @param {vec2} vec3 
     * @param {vec2} vec4 
     */
    constructor(vec1, vec2, vec3, vec4) {
        this.vec1 = vec1;
        this.vec2 = vec2;
        this.vec3 = vec3;
        this.vec4 = vec4;
        this.mid = vec2_line.vec2_line(this.vec1, this.vec3).intersection(vec2_line.vec2_line(this.vec2, this.vec4));
    }

    /**
     * 4つの点ベクトルから四角形を描画
     * @param {vec2} vec1 
     * @param {vec2} vec2 
     * @param {vec2} vec3 
     * @param {vec2} vec4 
     */
    static vec2_Quad(vec1, vec2, vec3, vec4) {
        quad(vec1.x, vec1.y, vec2.x, vec2.y, vec3.x, vec3.y, vec4.x, vec4.y);
    }

    /**
     * 
     */
    Quad(x, y) {
        push();
        quad(this.vec1.x + x, this.vec1.y + y, this.vec2.x + x, this.vec2.y + y, this.vec3.x + x, this.vec3.y + y, this.vec4.x + x, this.vec4.y + y);
        pop();
    }
}