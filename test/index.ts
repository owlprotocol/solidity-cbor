import { assert, expect } from "chai";
import { ethers } from "hardhat";
import cbor from "cbor";
import { toHex, padLeft, utf8ToHex } from "web3-utils";
import {
    // eslint-disable-next-line camelcase
    CBORDecoding__factory,
    // eslint-disable-next-line camelcase
    CBORTesting__factory,
    CBORTesting,
    // eslint-disable-next-line node/no-missing-import
} from "../typechain";
// eslint-disable-next-line node/no-missing-import
import dndData from "./dndData";
import { ContractFactory } from "ethers/lib/ethers";

describe("CBOR Decoding", function () {
    this.timeout(60_000);

    let decoder: CBORTesting;
    // eslint-disable-next-line camelcase
    let CBORTestingFactory: CBORTesting__factory;
    // eslint-disable-next-line camelcase
    let CBORDecodingFactory: CBORDecoding__factory;
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

    it("Basic primitive encoding/decoding", async function () {
        let value = -1;
        assert.equal(
            await decoder.testDecodeCBORPrimitive(cbor.encode(value)),
            toProperHex(-1 - value),
            "decoding failed!"
        );

        value = 100_000;
        assert.equal(
            await decoder.testDecodeCBORPrimitive(cbor.encode(value)),
            toProperHex(value),
            "decoding failed!"
        );

        value = -100;
        assert.equal(
            await decoder.testDecodeCBORPrimitive(cbor.encode(value)),
            toProperHex(-1 - value),
            "decoding failed!"
        );

        let stringValue = "im a string";
        assert.equal(
            await decoder.testDecodeCBORPrimitive(cbor.encode(stringValue)),
            toProperHex(stringValue),
            "decoding failed!"
        );

        stringValue = "im a long string".repeat(100);
        assert.equal(
            await decoder.testDecodeCBORPrimitive(cbor.encode(stringValue)),
            toProperHex(stringValue),
            "decoding failed!"
        );
    });

    it("Mapping decoding", async function () {
        const myMapping = { a: 1, b: "2", c: "3" };
        const decoded = await decoder.testDecodeCBORMapping(
            cbor.encode(myMapping)
        );
        // Assert
        expect(decoded).to.deep.equal(toExpectedValue(myMapping));
    });

    it("Array decoding", async function () {
        const myMapping = [1, 2, 3, 4];
        const decoded = await decoder.testDecodeCBORArray(
            cbor.encode(myMapping)
        );
        // Assert all keys are equal
        expect(decoded).to.deep.equal(toExpectedValue(myMapping));
    });

    it("Long array decoding", async function () {
        const myMapping = [];
        for (let x = 0; x < 50; x++) myMapping.push(x);
        const decoded = await decoder.testDecodeCBORArray(
            cbor.encode(myMapping)
        );
        // Assert all keys are equal
        expect(decoded).to.deep.equal(toExpectedValue(myMapping));
    });

    it("Nested array", async function () {
        const myArray = [[1, 2, [3], 4]];
        const decoded = await decoder.testDecodeCBORArray(cbor.encode(myArray));
        // Assert keys equal
        expect(decoded).to.deep.equal(toExpectedValue(myArray));
    });

    it("Nested mapping", async function () {
        const myMapping = { 1.2: 2, 3: { 4: { 10: 12.5 } }, 5: { 6: 7 }, 7: 8 };
        const decoded = await decoder.testDecodeCBORMapping(
            cbor.encode(myMapping)
        );
        // Assert keys equal
        expect(decoded).to.deep.equal(toExpectedValue(myMapping));
    });

    it("Long mapping decoding", async function () {
        const myMapping = {};
        // @ts-ignore
        for (let x = 0; x < 50; x++) myMapping[x] = { value: x };
        const decoded = await decoder.testDecodeCBORMapping(
            cbor.encode(myMapping)
        );
        // Assert all keys are equal
        expect(decoded).to.deep.equal(toExpectedValue(myMapping));
    });

    it("Test Data", async function () {
        const character = dndData.character;
        const decoded = await decoder.testDecodeCBORMapping(
            cbor.encode(character),
            {
                gasLimit: 100_000_000,
            }
        );
        // Assert decoded
        expect(decoded).to.deep.equal(toExpectedValue(character));
    });

    // it("Linear Search Decoding", async function () {
    //     const decoder = await CBORTestingFactory.deploy();

    //     const values = cbor.encode({ a: 1, b: 2, c: 3 });
    //     // Good call
    //     await decoder.testDecodeCBORMappingGetValue(values, toHex("a"));
    //     // Bad call
    //     const call = decoder.testDecodeCBORMappingGetValue(values, toHex("x"));
    //     await expect(call).to.be.revertedWith("Key not found!");
    // });

    it("Test with game data", async () => {
        const profiles = [
            {
                id: "1",
                name: "Alice",
                address: "0x0000000000000000000000000000000000000001",
                score: 10,
                balance: "1000000000000000000",
                premium: false,
            },
            {
                id: "2",
                name: "Bob",
                address: "0x0000000000000000000000000000000000000002",
                score: 100,
                balance: "5000000000000000000",
                premium: true,
            },
            {
                id: "3",
                name: "Charlie",
                address: "0x0000000000000000000000000000000000000003",
                score: 50,
                balance: "2000000000000000000",
                premium: false,
            },
        ];
        for (const profile of profiles) {
            const decodedProfile = await decoder.testDecodeCBORMapping(
                cbor.encode(profile)
            );
            expect(decodedProfile).to.deep.equal(toExpectedValue(profile));
        }
    });
});

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
    if (typeof v === "object")
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
