import { MSB_BITS8 } from "@thi.ng/binary";
import { GRAY16, luminanceABGR, PackedBuffer } from "@thi.ng/pixel";

/**
 * Initializes byte array & PBM header for given {@link PackedBuffer} and format
 * details.
 *
 * @param magic
 * @param limits
 * @param size
 * @param buf
 *
 * @internal
 */
const init = (
    magic: string,
    limits: number,
    size: number,
    buf: PackedBuffer
) => {
    const { width, height } = buf;
    let header = `${magic}\n# generated by @thi.ng/pixel\n${width} ${height}\n`;
    if (limits > 0) header += limits + "\n";
    const dest = new Uint8Array(size + header.length);
    dest.set([...header].map((x) => x.charCodeAt(0)));
    return { dest, start: header.length, abgr: buf.format.toABGR };
};

/**
 * Converts a {@link PackedBuffer} into a 1bit PBM byte array (binary format).
 *
 * @remarks
 * Reference: http://netpbm.sourceforge.net/doc/pbm.html
 *
 * @param buf
 */
export const asPBM = (buf: PackedBuffer) => {
    const { pixels, width, height } = buf;
    const { dest, start, abgr } = init(
        "P4",
        0,
        Math.ceil(width / 8) * height,
        buf
    );
    const w1 = width - 1;
    for (let y = 0, i = start, j = 0; y < height; y++) {
        for (let x = 0, b = 0; x <= w1; x++, j++) {
            if (luminanceABGR(abgr(pixels[j])) < 128) {
                b |= MSB_BITS8[x & 7];
            }
            if ((x & 7) === 7 || x === w1) {
                dest[i++] = b;
                b = 0;
            }
        }
    }
    return dest;
};

/**
 * Converts a {@link PackedBuffer} into a 8bit grayscale PGM byte array (binary
 * format).
 *
 * @remarks
 * Reference: http://netpbm.sourceforge.net/doc/pgm.html
 *
 * @param buf
 */
export const asPGM = (buf: PackedBuffer) => {
    const { pixels, width, height } = buf;
    const { dest, start, abgr } = init("P5", 0xff, width * height, buf);
    for (let i = start, j = 0; j < pixels.length; i++, j++) {
        dest[i] = luminanceABGR(abgr(pixels[j]));
    }
    return dest;
};

/**
 * Converts a {@link PackedBuffer} into a 16bit grayscale PGM byte array (binary
 * format).
 *
 * @remarks
 * Reference: http://netpbm.sourceforge.net/doc/pgm.html
 *
 * @param buf
 */
export const asPGM16 = (buf: PackedBuffer) => {
    if (buf.format !== GRAY16) buf = buf.as(GRAY16);
    const { pixels, width, height } = buf;
    const { dest, start } = init("P5", 0xffff, width * height * 2, buf);
    for (let i = start, j = 0; j < pixels.length; i += 2, j++) {
        dest[i] = pixels[j] >> 8;
        dest[i + 1] = pixels[j] & 0xff;
    }
    return dest;
};

/**
 * Converts a {@link PackedBuffer} into a 24bit PPM byte array (binary format).
 *
 * @remarks
 * Reference: http://netpbm.sourceforge.net/doc/ppm.html
 *
 * @param buf
 */
export const asPPM = (buf: PackedBuffer) => {
    const { pixels, width, height } = buf;
    const { dest, start, abgr } = init("P6", 255, width * 3 * height, buf);
    for (let i = start, j = 0; j < pixels.length; i += 3, j++) {
        const col = abgr(pixels[j]);
        dest[i] = col & 0xff;
        dest[i + 1] = (col >> 8) & 0xff;
        dest[i + 2] = (col >> 16) & 0xff;
    }
    return dest;
};