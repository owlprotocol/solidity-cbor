/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import {
    // eslint-disable-next-line camelcase
    CBORDecoding__factory,
    // eslint-disable-next-line camelcase
    CBORTesting__factory,
    CBORTesting,
} from "../typechain";
import { toProperHex, maxValueForBytes, toExpectedValue } from "./helpers/testUtils";
import { ContractFactory } from "ethers/lib/ethers";
import { encodeCBOR } from "./helpers/encodeCBORUtils";
import BN from "bn.js";

const MAJOR_TYPE_UINT = 0;
const MAJOR_TYPE_NEGATIVE = 1;
const MAJOR_TYPE_BYTE_STRING = 2;
const MAJOR_TYPE_UTF8_STRING = 3;
const MAJOR_TYPE_SEMANTIC = 6;
const MAJOR_TYPE_SPECIAL = 7;

const SHORT_COUNT_1_BYTES = 24;
const SHORT_COUNT_2_BYTES = 25;
const SHORT_COUNT_4_BYTES = 26;
const SHORT_COUNT_8_BYTES = 27;
const SHORT_COUNT_INDEFNITE = 31;

const TAG_TYPE_BIG_NUM = 2;

const NEGATIVE_1 = new BN(-1);

const SPECIAL_TYPE_FALSE = 20;
const SPECIAL_TYPE_TRUE = 21;
const SPECIAL_TYPE_NULL = 22;
const SPECIAL_TYPE_UNDEFINED = 23;


describe("CBORPrimitives.sol", function () {
    this.timeout(60_000);

    let decoder: CBORTesting;
    // eslint-disable-next-line camelcase
    let CBORTestingFactory: CBORTesting__factory;
    // eslint-disable-next-line camelcase
    let CBORDecodingFactory: CBORDecoding__factory;
    let ByteParserFactory: ContractFactory;

    let value;
    let encoding;

    before(async () => {
        CBORDecodingFactory = await ethers.getContractFactory("CBORDecoding");
        ByteParserFactory = await ethers.getContractFactory("ByteParser");
        CBORTestingFactory = await ethers.getContractFactory("CBORTesting", {
            libraries: {
                CBORDecoding: (await CBORDecodingFactory.deploy()).address,
                ByteParser: (await ByteParserFactory.deploy()).address,
            },
        });
        // Deploy our decoder library
        decoder = await CBORTestingFactory.deploy();
    });

    describe("Major Type: 1 + 2", async () => {
        it("Unsigned Integers", async () => {
            // 0 is encoded in the shortcount
            value = 0;
            encoding = encodeCBOR(MAJOR_TYPE_UINT, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // 1 is encoded in the shortcount
            value = 1;
            encoding = encodeCBOR(MAJOR_TYPE_UINT, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // 255 takes up 1 byte
            value = maxValueForBytes(1);
            encoding = encodeCBOR(MAJOR_TYPE_UINT, SHORT_COUNT_1_BYTES, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // 65535 takes up 2 byte(s)
            value = maxValueForBytes(2);
            encoding = encodeCBOR(MAJOR_TYPE_UINT, SHORT_COUNT_2_BYTES, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // 4294967295 takes up 4 byte(s)
            value = maxValueForBytes(4);
            encoding = encodeCBOR(MAJOR_TYPE_UINT, SHORT_COUNT_4_BYTES, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // 18446744073709551615 takes up 8 byte(s)
            value = maxValueForBytes(8);
            encoding = encodeCBOR(MAJOR_TYPE_UINT, SHORT_COUNT_8_BYTES, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );
        });

        it("Negative Integers", async () => {
            // NOTE: CBOR negative values are represented as (-1 - UINT)
            // -1 is encoded in the shortcount
            value = -1;
            encoding = encodeCBOR(MAJOR_TYPE_NEGATIVE, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(-1 - value),
                `decoding ${value} failed!`
            );

            // -2 is encoded in the shortcount
            value = -2;
            encoding = encodeCBOR(MAJOR_TYPE_NEGATIVE, value);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(-1 - value),
                `decoding ${value} failed!`
            );

            // -256 takes up 1 byte -((2^8) - 1 + 1)
            value = maxValueForBytes(1).addn(1).muln(-1);
            encoding = encodeCBOR(
                MAJOR_TYPE_NEGATIVE,
                SHORT_COUNT_1_BYTES,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(NEGATIVE_1.sub(value)),
                `decoding ${value} failed!`
            );

            // 65535 takes up 2 byte(s)
            value = maxValueForBytes(2).addn(1).muln(-1);
            encoding = encodeCBOR(
                MAJOR_TYPE_NEGATIVE,
                SHORT_COUNT_2_BYTES,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(NEGATIVE_1.sub(value)),
                `decoding ${value} failed!`
            );

            // 4294967295 takes up 4 byte(s)
            value = maxValueForBytes(4).addn(1).muln(-1);
            encoding = encodeCBOR(
                MAJOR_TYPE_NEGATIVE,
                SHORT_COUNT_4_BYTES,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(NEGATIVE_1.sub(value)),
                `decoding ${value} failed!`
            );

            // 18446744073709551615 takes up 8 byte(s)
            value = maxValueForBytes(8).addn(1).muln(-1);
            encoding = encodeCBOR(
                MAJOR_TYPE_NEGATIVE,
                SHORT_COUNT_8_BYTES,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(NEGATIVE_1.sub(value)),
                `decoding ${value} failed!`
            );
        });

        it("Invalid RFC", async () => {
            encoding = encodeCBOR(MAJOR_TYPE_UINT, 28);
            await expect(
                decoder.testDecodeCBORPrimitive(encoding)
            ).to.be.revertedWith("Invalid integer RFC Shortcode!");
        });
    });

    describe("Major Type: 3 + 4", async () => {
        it("Byte Strings", async () => {
            // Test empty byte string
            value = "";
            encoding = encodeCBOR(
                MAJOR_TYPE_BYTE_STRING,
                value.length,
                undefined,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // 1 letter
            value = "a";
            encoding = encodeCBOR(
                MAJOR_TYPE_BYTE_STRING,
                value.length,
                undefined,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // Max shortcount
            value = "a".repeat(23);
            encoding = encodeCBOR(
                MAJOR_TYPE_BYTE_STRING,
                value.length,
                undefined,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // Count 1 byte long
            value = "a".repeat(24);
            encoding = encodeCBOR(
                MAJOR_TYPE_BYTE_STRING,
                SHORT_COUNT_1_BYTES,
                value.length,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            // Count 2 byte long
            value = "a".repeat(256);
            encoding = encodeCBOR(
                MAJOR_TYPE_BYTE_STRING,
                SHORT_COUNT_2_BYTES,
                value.length,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );

            /**
             * NOTE: Byte strings longer than 65536 characters
             * take too long to process and are likely to run
             * out of gas. Since the implementation is the same
             * for 1 bytes and 2 bytes, we can trust it works.
             */

            // Indefinite length
            value = "a".repeat(80);
            encoding = encodeCBOR(
                MAJOR_TYPE_BYTE_STRING,
                SHORT_COUNT_INDEFNITE,
                undefined, // no count field
                value,
                true // end with marker
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );
        });

        it("UTF8 Strings", async () => {
            // UTF8 and Ascii strings are processed with the same function.
            // We just want to ensure the tag filtering works
            value = "a";
            encoding = encodeCBOR(
                MAJOR_TYPE_UTF8_STRING,
                value.length,
                undefined,
                value
            );
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toProperHex(value),
                `decoding ${value} failed!`
            );
        });

        it("Invalid RFC", async () => {
            encoding = encodeCBOR(MAJOR_TYPE_UTF8_STRING, 28);
            await expect(
                decoder.testDecodeCBORPrimitive(encoding)
            ).to.be.revertedWith("Invalid string RFC Shortcode!");
        });
    });

    describe("Major Types: 6", async () => {
        it("Big Numbers", async function () {
            // 2^64 - 1
            value = maxValueForBytes(8).toString();
            encoding = Buffer.concat([
                // Start with a BigNum encoding
                encodeCBOR(MAJOR_TYPE_SEMANTIC, TAG_TYPE_BIG_NUM),
                // Follow with a byte string
                encodeCBOR(
                    MAJOR_TYPE_BYTE_STRING,
                    SHORT_COUNT_1_BYTES,
                    value.length,
                    value
                ),
            ]);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toExpectedValue(value),
                `decoding ${value} failed!`
            );

            // 2^128 - 1
            value = maxValueForBytes(16).toString();
            encoding = Buffer.concat([
                // Start with a BigNum encoding
                encodeCBOR(MAJOR_TYPE_SEMANTIC, TAG_TYPE_BIG_NUM),
                // Follow with a byte string
                encodeCBOR(
                    MAJOR_TYPE_BYTE_STRING,
                    SHORT_COUNT_1_BYTES,
                    value.length,
                    value
                ),
            ]);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toExpectedValue(value),
                `decoding ${value} failed!`
            );

            // 2^256 - 1
            value = maxValueForBytes(32).toString();
            encoding = Buffer.concat([
                // Start with a BigNum encoding
                encodeCBOR(MAJOR_TYPE_SEMANTIC, TAG_TYPE_BIG_NUM),
                // Follow with a byte string
                encodeCBOR(
                    MAJOR_TYPE_BYTE_STRING,
                    SHORT_COUNT_1_BYTES,
                    value.length,
                    value
                ),
            ]);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                toExpectedValue(value),
                `decoding ${value} failed!`
            );
        });

        it("Unsupported Tag Type", async () => {
            encoding = encodeCBOR(MAJOR_TYPE_SEMANTIC, 1);
            await expect(
                decoder.testDecodeCBORPrimitive(encoding)
            ).to.be.revertedWith("Unsupported Tag Type!");
        });
    });

    describe("Major Types: 7", async () => {

        const FALSE = toProperHex(0);
        const TRUE = toProperHex(1);

        it("Specials", async function () {
            // Test false
            encoding = encodeCBOR(MAJOR_TYPE_SPECIAL, SPECIAL_TYPE_FALSE);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                FALSE,
                `decoding false failed!`
            );

            // Test true
            encoding = encodeCBOR(MAJOR_TYPE_SPECIAL, SPECIAL_TYPE_TRUE);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                TRUE,
                `decoding true failed!`
            );

            // Test null
            encoding = encodeCBOR(MAJOR_TYPE_SPECIAL, SPECIAL_TYPE_NULL);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                FALSE,
                `decoding null failed!`
            );

            // Test undefined
            encoding = encodeCBOR(MAJOR_TYPE_SPECIAL, SPECIAL_TYPE_UNDEFINED);
            assert.equal(
                await decoder.testDecodeCBORPrimitive(encoding),
                FALSE,
                `decoding undefined failed!`
            );
        });

        it("Invalid RFC", async () => {
            // Invalid code
            encoding = encodeCBOR(MAJOR_TYPE_SPECIAL, 19);
            await expect(
                decoder.testDecodeCBORPrimitive(encoding)
            ).to.be.revertedWith("Invalid special RFC Shortcount!");

            // Unimplemented short code
            encoding = encodeCBOR(MAJOR_TYPE_SPECIAL, 24);
            await expect(
                decoder.testDecodeCBORPrimitive(encoding)
            ).to.be.revertedWith("Unimplemented Shortcount!");
        });
    });
});
