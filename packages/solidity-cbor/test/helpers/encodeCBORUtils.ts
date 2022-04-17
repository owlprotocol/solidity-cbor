// eslint-disable-next-line node/no-unpublished-import
import BN from "bn.js";
import { utf8ToHex } from "web3-utils";
// eslint-disable-next-line node/no-missing-import
import { toProperHex } from "./testUtils";

const BASE10 = 10;
const END_MARKER = Buffer.from("FF", "hex");

export const encodeCBOR = (
    majorType: number,
    shortCount: number,
    count?: number | BN,
    variable?: number | BN | string | Buffer,
    endWithMarker: boolean = false
) => {
    const values = [];

    // Add the field header
    values.push(encodeFieldHeader(majorType, shortCount));
    // Add extended count
    if (typeof count !== "undefined") values.push(encodeExtendedCount(count));
    // Add variable field
    if (typeof variable !== "undefined") values.push(encodeVariable(variable));
    // Add end marker
    if (endWithMarker === true) values.push(END_MARKER);

    // Create encoding from all values
    const encoding = Buffer.concat(values);

    return encoding;
};

const encodeFieldHeader = (majorType: number | BN, shortCount: number | BN) => {
    if (typeof majorType === "number") majorType = new BN(majorType, BASE10);

    if (typeof shortCount === "number") shortCount = new BN(shortCount, BASE10);

    // Check negative, switch to (-1 - num)
    if (shortCount.isNeg()) shortCount = new BN(-1).sub(shortCount);

    const encoding = new BN(
        // Bits 1-5 are shortCount
        shortCount.or(
            // Bits 6-8 are majorType
            majorType.shln(5)
        ),
        BASE10
    );

    return encoding.toBuffer();
};

const encodeExtendedCount = (count: number | BN) => {
    let encoding;
    // Type checks
    if (typeof count === "number") encoding = new BN(count, BASE10);
    else encoding = count;

    // Check negative, switch to (-1 - num)
    if (encoding.isNeg()) encoding = new BN(-1).sub(encoding);

    return encoding.toBuffer();
};

const encodeVariable = (value: number | string | BN | Buffer) => {
    // Type checks
    if (typeof value === "number") value = new BN(value, BASE10);
    // Strings
    else if (typeof value === "string")
        value = new BN(toProperHex(value).slice(2), "hex");
    // Allow buffers to be passed in directly
    else if (Buffer.isBuffer(value)) return value;

    return value.toBuffer();
};
