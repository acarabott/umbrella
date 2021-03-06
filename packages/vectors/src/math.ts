export const PI = Math.PI;
export const TAU = PI * 2;
export const HALF_PI = PI / 2;
export const QUARTER_PI = PI / 4;

export const DEG2RAD = PI / 180;
export const RAD2DEG = 180 / PI;

export let EPS = 1e-6;

export const absDiff1 = (x: number, y: number) =>
    Math.abs(x - y);

export const atan2Abs1 = (y: number, x: number) => {
    const theta = Math.atan2(y, x);
    return theta < 0 ? TAU + theta : theta;
};

/**
 * Converts angle to degrees.
 *
 * @param x angle in radians
 */
export const deg = (x: number) => x * RAD2DEG;

/**
 * Converts angle to radians.
 *
 * @param x angle in degrees
 */
export const rad = (x: number) => x * DEG2RAD;

/**
 * Checks if `|a - b| <= ε`.
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance
 */
export const eqDelta1 = (a: number, b: number, eps = EPS) => {
    const d = a - b;
    return (d < 0 ? -d : d) <= eps;
};

/**
 * Returns `a - b * n`
 *
 * @param a
 * @param b
 */
export const fmod1 = (a: number, b: number) =>
    a - b * Math.floor(a / b);

/**
 * Step/threshold function.
 *
 * @param edge threshold
 * @param x test value
 * @returns 0, if `x < e`, else 1
 */
export const step1 = (edge: number, x: number) =>
    x < edge ? 0 : 1;

/**
 * GLSL-style smoothStep threshold function.
 *
 * @param edge lower threshold
 * @param edge2 upper threshold
 * @param x test value
 * @returns 0, if `x < edge1`, 1 if `x > edge2`, else sigmoid interpolation
 */
export const smoothStep1 = (edge: number, edge2: number, x: number) => {
    const t = clamp1((x - edge) / (edge2 - edge), 0, 1);
    return (3 - 2 * t) * t * t;
};

export const expStep1 = (x: number, k: number, n: number) =>
    Math.exp(-k * Math.pow(x, n));

export const gain1 = (x: number, k: number) =>
    x < 0.5 ?
        0.5 * Math.pow(2 * x, k) :
        1 - 0.5 * Math.pow(2 - 2 * x, k);

export const min2id = (a: number, b: number) =>
    a <= b ? 0 : 1;

export const min3id = (a: number, b: number, c: number) =>
    (a <= b) ?
        (a <= c ? 0 : 2) :
        (b <= c ? 1 : 2);

export const min4id = (a: number, b: number, c: number, d: number) =>
    a <= b ?
        (a <= c ?
            (a <= d ? 0 : 3) :
            (c <= d ? 2 : 3)) :
        (b <= c ?
            (b <= d ? 1 : 3) :
            (c <= d ? 2 : 3));

export const max2id = (a: number, b: number) =>
    a >= b ? 0 : 1;

export const max3id = (a: number, b: number, c: number) =>
    (a >= b) ?
        (a >= c ? 0 : 2) :
        (b >= c ? 1 : 2);

export const max4id = (a: number, b: number, c: number, d: number) =>
    a >= b ?
        (a >= c ?
            (a >= d ? 0 : 3) :
            (c >= d ? 2 : 3)) :
        (b >= c ?
            (b >= d ? 1 : 3) :
            (c >= d ? 2 : 3));

export const smin1 = (a: number, b: number, k: number) =>
    -Math.log(Math.exp(-k * a) + Math.exp(-k * b)) / k;

export const smax1 = (a: number, b: number, k: number) =>
    Math.log(Math.exp(a) + Math.exp(b)) / k;

/**
* Clamps value `x` to given closed interval.
*
* @param x value to clamp
* @param min lower bound
* @param max upper bound
*/
export const clamp1 = (x: number, min: number, max: number) =>
    x < min ? min : x > max ? max : x;

export const mix1 = (a: number, b: number, t: number) =>
    a + (b - a) * t;

/**
 * ```
 * c    d
 * +----+
 * |    |
 * +----+
 * a    b
 * ```
 *
 * @param a BL value
 * @param b BR value
 * @param c TL value
 * @param d TR value
 * @param u 1st interpolation factor
 * @param v 2nd interpolation factor
 */
export const mixBilinear1 = (a: number, b: number, c: number, d: number, u: number, v: number) =>
    mix1(mix1(a, b, u), mix1(c, d, u), v);

export const norm1 = (x: number, a: number, b: number) =>
    (x - a) / (b - a);

export const fit1 = (x: number, a: number, b: number, c: number, d: number) =>
    c + (d - c) * (x - a) / (b - a);

export const fitClamped1 = (x: number, a: number, b: number, c: number, d: number) =>
    c + (d - c) * clamp1((x - a) / (b - a), 0, 1);

export const sign1 = (x: number, eps = EPS) =>
    x > eps ? 1 : x < -eps ? -1 : 0;

export const fract1 = (x: number) =>
    x - Math.floor(x);

export const trunc1 = (x: number) =>
    x < 0 ? Math.ceil(x) : Math.floor(x);

export const roundTo1 = (x: number, prec = 1) =>
    Math.round(x / prec) * prec;

/**
 * Returns true iff `x` is in closed interval `[min .. max]`
 *
 * @param x
 * @param min
 * @param max
 */
export const inRange1 = (x: number, min: number, max: number) =>
    x >= min && x <= max;

/**
 * Returns true iff `x` is in open interval `(min .. max)`
 *
 * @param x
 * @param min
 * @param max
 */
export const inOpenRange1 = (x: number, min: number, max: number) =>
    x > min && x < max;

export const hash1 = (x: number) =>
    fract1(Math.sin(x) * 758.5453);
