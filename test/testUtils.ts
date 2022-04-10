import { toHex, padLeft, utf8ToHex } from "web3-utils";
import cbor from "cbor";
import BN from "bn.js";

export function toExpectedValue(value: any) {
    /**
     * Testing is complicated by the fact that CBORDecode is nest-aware, but
     * cannot decode and return a nested object. Instead, it has to decode one
     * layer at a time (due to polymorphism limitations of Solidity).
     */
    let expectedValue;
    if (Array.isArray(value)) expectedValue = value.map((v) => toProperHex(v));
    else if (typeof value === "object")
        expectedValue = Object.entries(value).map(([k, v]) => [
            utf8ToHex(k),
            toProperHex(v),
        ]);
    else expectedValue = toProperHex(value);

    return expectedValue;
}

export const toProperHex = (v: any) => {
    let vencoded;
    if (BN.isBN(v))
        // Convert big integers
        vencoded = "0x" + v.toString("hex");
    else if (typeof v === "object")
        // Convert nested objects to cbor
        vencoded = "0x" + cbor.encode(v).toString("hex");
    else if (typeof v === "number") {
        // Convert to hex and pad appropriately
        vencoded = base2Padding(toHex(v));
    } else if (typeof v === "string") {
        // Strings don't need special padding
        vencoded = utf8ToHex(v);
    } else {
        vencoded = toHex(v);
    }
    return vencoded;
};

export const base2Padding = (hexString: string) => {
    /**
     * Calculates and formats proper byte padding for expected Solidity bytes.
     * A hex with 3 digits (0x003) needs 4 digits of padding (0x0004).
     * A hex with 5 digits needs 8 digits of padding.
     * A hex with 12 digits needs 16 digits of padding.
     * It's always the next highest base2 value. (2,4,8,16,32,...)
     */
    // Slice off '0x'
    let hexLength = hexString.length;
    if (hexString.slice(0, 2) === "0x") hexLength -= 2;
    // Calculate closest base2 exponent (2, 4, 8, etc)
    let base2Exponent;
    if (hexLength > 1) {
        base2Exponent = Math.ceil(Math.log2(hexLength));
    } else base2Exponent = 1;
    // Return padded
    return padLeft(hexString, 2 ** base2Exponent);
};

export const maxValueForBytes = (bytes: number) => {
    const bits = bytes * 8;
    const exp = new BN(bits);
    // Raise 2^exp - 1
    const value = new BN(2).pow(exp).subn(1);

    return value;
};
