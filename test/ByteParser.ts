/* eslint-disable node/no-unpublished-import */
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import cbor from "cbor";
import {
    // eslint-disable-next-line camelcase
    CBORDecoding__factory,
    // eslint-disable-next-line camelcase
    CBORTesting__factory,
    CBORTesting,
    // eslint-disable-next-line camelcase
    // ByteParser__factory,
    // eslint-disable-next-line node/no-missing-import
} from "../typechain";
// eslint-disable-next-line node/no-missing-import
import { ContractFactory } from "ethers/lib/ethers";

describe("ByteParser.sol", function () {
    this.timeout(60_000);

    let decoder: CBORTesting;
    // eslint-disable-next-line camelcase
    let CBORTestingFactory: CBORTesting__factory;
    // eslint-disable-next-line camelcase
    let CBORDecodingFactory: CBORDecoding__factory;
    // eslint-disable-next-line camelcase
    let ByteParserFactory: ContractFactory;

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

    it("byte -> uint64 conversions", async function () {
        let val;
        let decodedBytes;
        let decodedVal;

        // Test our minimum
        val = 0;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToUint64(decodedBytes);
        assert(decodedVal.eq(val), "decoded value not equal!");

        // Test values -2^1,-2^2....,-2^32
        for (let exponent = 1; exponent < 33; exponent *= 2) {
            val = 2 ** exponent;
            decodedBytes = await decoder.testDecodeCBORPrimitive(
                cbor.encode(val)
            );
            decodedVal = await decoder.testBytesToUint64(decodedBytes);
            assert(
                decodedVal.eq(val),
                `decoded value (2^${exponent} not equal!`
            );
        }

        // Test our maximum (Javascript only allows for 2**53-1, so we'll test that).
        // This works, because if we can do 2**53-1, we know we support 2**64-1.
        val = 2 ** 52;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToUint64(decodedBytes);
        assert(decodedVal.eq(val), "decoded value not equal!");
    });

    it("byte -> int128 conversions", async function () {
        let val;
        let decodedBytes;
        let decodedVal;

        // Test our minimum
        val = -1;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToNegativeInt128(decodedBytes);
        assert(decodedVal.eq(val), "decoded value not equal!");

        // Test values -2^1,-2^2....,-2^32
        for (let exponent = 1; exponent < 33; exponent *= 2) {
            val = -1 * 2 ** exponent;
            decodedBytes = await decoder.testDecodeCBORPrimitive(
                cbor.encode(val)
            );
            decodedVal = await decoder.testBytesToNegativeInt128(decodedBytes);
            assert(
                decodedVal.eq(val),
                `decoded value (2^${exponent} not equal!`
            );
        }

        // Test our maximum (Javascript only allows for 2**53-1, so we'll test that).
        // This works, because if we can do 2**53-1, we know we support 2**64-1.
        val = -1 * 2 ** 52;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToNegativeInt128(decodedBytes);
        assert(decodedVal.eq(val), "decoded value not equal!");
    });

    it("byte -> string conversions", async function () {
        let val;
        let decodedBytes;
        let decodedVal;

        // Test our minimum
        val = "Shorter than 24 chars";
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToString(decodedBytes);
        assert.equal(decodedVal, val, "decoded value not equal!");

        // Test a longer string
        val = "Some string value longer than 24 characters";
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToString(decodedBytes);
        assert.equal(decodedVal, val, "decoded value not equal!");
    });

    it("byte -> BigNum conversions", async function () {
        // Test our value
        const val =
            "c2" + // MajorType: 7, Tag: 2 (BigNum)
            "5820" + // Bytes 32 String
            "f".repeat(64); // 2**256-1
        const decodedBytes = await decoder.testDecodeCBORPrimitive(
            Buffer.from(val, "hex")
        );
        const decodedVal = await decoder.testBytesToBigNumber(decodedBytes);
        assert.equal(
            decodedVal._hex, // hex value from BigNumber
            "0x" + val.slice(6), // Slice off field encoding (c25820)
            "decoded value not equal!"
        );
    });

    it("byte -> boolean", async function () {
        let val;
        let decodedBytes;
        let decodedVal;

        // Test false
        val = false;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToBool(decodedBytes);
        assert.equal(decodedVal, val, "decoded value not equal!");

        // Test null
        val = null;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToBool(decodedBytes);
        assert.equal(decodedVal, Boolean(val), "decoded value not equal!");

        // Test undefined
        val = undefined;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToBool(decodedBytes);
        assert.equal(decodedVal, Boolean(val), "decoded value not equal!");

        // Test true
        val = true;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        decodedVal = await decoder.testBytesToBool(decodedBytes);
        assert.equal(decodedVal, val, "decoded value not equal!");

        // Test too long
        val = "123";
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        await expect(decoder.testBytesToBool(decodedBytes)).to.revertedWith(
            "Data is not a boolean!"
        );

        // Test bad number
        val = 3;
        decodedBytes = await decoder.testDecodeCBORPrimitive(cbor.encode(val));
        await expect(decoder.testBytesToBool(decodedBytes)).to.revertedWith(
            "Improper boolean!"
        );
    });
});
