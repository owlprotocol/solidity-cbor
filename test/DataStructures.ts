/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import cbor from "cbor";
import { toHex } from "web3-utils";
import {
    // eslint-disable-next-line camelcase
    CBORDecoding__factory,
    // eslint-disable-next-line camelcase
    CBORTesting__factory,
    CBORTesting,
} from "../typechain";
import dndData from "./sampleDatasets/dndData";
import { toExpectedValue, toProperHex, maxValueForBytes } from "./helpers/testUtils";
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

const NEGATIVE_1 = new BN(-1);

describe("CBORDataStructures.sol", function () {
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

    it.skip("Nested mapping", async function () {
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
        const character = dndData;
        const decoded = await decoder.testDecodeCBORMapping(
            cbor.encode(character),
            {
                gasLimit: 100_000_000,
            }
        );
        // Assert decoded
        expect(decoded).to.deep.equal(toExpectedValue(character));
    });

    it("Linear Search Decoding", async function () {
        const decoder = await CBORTestingFactory.deploy();

        const values = { a: 1, b: 2, c: 3 };
        // Good call
        const value = await decoder.testDecodeCBORMappingGetValue(
            cbor.encode(values),
            toHex("b")
        );
        expect(value).to.equal(toExpectedValue(values.b));
        // Bad call
        const call = decoder.testDecodeCBORMappingGetValue(
            cbor.encode(values),
            toHex("x")
        );
        await expect(call).to.be.revertedWith("Key not found!");
    });

    it("Linear Get Index", async function () {
        const decoder = await CBORTestingFactory.deploy();

        const values = ["a", "b", "c", "d"];
        // Good call
        const value = await decoder.testDecodeCBORArrayGetIndex(
            cbor.encode(values),
            toHex("d")
        );
        expect(value).to.equal(values.indexOf("d"));
        // Bad call
        const call = decoder.testDecodeCBORArrayGetIndex(
            cbor.encode(values),
            toHex("x")
        );
        await expect(call).to.be.revertedWith("Item not found!");
    });

    it("Linear Get Item", async function () {
        const decoder = await CBORTestingFactory.deploy();

        const values = ["a", "b", "c", "d"];
        // Good call
        const value = await decoder.testDecodeCBORArrayGetItem(
            cbor.encode(values),
            3
        );
        expect(value).to.equal(toExpectedValue(values[3]));
        // Bad call
        const call = decoder.testDecodeCBORArrayGetItem(cbor.encode(values), 5);
        await expect(call).to.be.revertedWith(
            "Index provided larger than list!"
        );
    });

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
