/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { expect } from "chai";
import { ethers } from "hardhat";
import cbor from "cbor";
import {
    // eslint-disable-next-line camelcase
    CBORDecoding__factory,
    // eslint-disable-next-line camelcase
    CBORTesting__factory,
    CBORTesting,
} from "../typechain";
import dndData from "./sampleDatasets/dndData";
import { toExpectedValue, listToMapping } from "./helpers/testUtils";
import { ContractFactory } from "ethers/lib/ethers";
import { encodeCBOR } from "./helpers/encodeCBORUtils";

const MAJOR_TYPE_ARRAY = 4;
const MAJOR_TYPE_MAPPING = 5;

const SHORT_COUNT_1_BYTES = 24;
const SHORT_COUNT_2_BYTES = 25;
// const SHORT_COUNT_4_BYTES = 26;
// const SHORT_COUNT_8_BYTES = 27;
const SHORT_COUNT_INDEFNITE = 31;

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
    let packedEncoding;
    let decoded;

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

    describe("Major Types: 4", async () => {
        it("Flat Arrays", async () => {
            // Shortcount = 8
            value = [1, 2, 3, 4, 5, 6, 7, 8];
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_ARRAY,
                value.length,
                undefined,
                packedEncoding
            );
            decoded = await decoder.testDecodeCBORArray(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(toExpectedValue(value));

            // Count takes 1 byte length
            value = [];
            for (let x = 0; x < 255; x++) value.push(x); // [0,...,254]
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_ARRAY,
                SHORT_COUNT_1_BYTES,
                value.length,
                packedEncoding
            );
            decoded = await decoder.testDecodeCBORArray(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(toExpectedValue(value));

            // Count takes 2 bytes length
            value = [];
            for (let x = 0; x < 256; x++) value.push(x); // [0,...,255]
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_ARRAY,
                SHORT_COUNT_2_BYTES,
                value.length,
                packedEncoding
            );
            decoded = await decoder.testDecodeCBORArray(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(toExpectedValue(value));

            // Indefinite length array
            value = [];
            for (let x = 0; x < 50; x++) value.push(x); // [0,...,49]
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_ARRAY,
                SHORT_COUNT_INDEFNITE,
                undefined,
                packedEncoding,
                true // endWithMarker
            );
            decoded = await decoder.testDecodeCBORArray(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(toExpectedValue(value));
        });

        it("Nested Arrays", async () => {
            value = [0, [1, [2], [[3]], [4]]];
            encoding = cbor.encode(value);
            decoded = await decoder.testDecodeCBORArray(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(toExpectedValue(value));
        });

        it("Invalid RFC", async () => {
            // Invalid code
            encoding = encodeCBOR(MAJOR_TYPE_ARRAY, 30);
            await expect(
                decoder.testDecodeCBORArray(encoding)
            ).to.be.revertedWith("Invalid data structure RFC Shortcode!");
        });
    });

    describe("Major Types: 5", async () => {
        it("Flat Mappings", async () => {
            // Shortcount = 8
            value = ["1", "2", "3", "4", "5", "6", "7", "8"];
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_MAPPING,
                value.length / 2, // Pairs not items
                undefined,
                packedEncoding
            );
            decoded = await decoder.testDecodeCBORMapping(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(
                toExpectedValue(listToMapping(value))
            );

            // Count takes 1 byte length
            value = [];
            for (let x = 0; x < 254; x++) value.push(x.toString()); // [0,...,254]
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_MAPPING,
                SHORT_COUNT_1_BYTES,
                value.length / 2,
                packedEncoding
            );
            decoded = await decoder.testDecodeCBORMapping(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(
                toExpectedValue(listToMapping(value))
            );

            // // Count takes 2 bytes length
            // value = [];
            // for (let x = 0; x < 510; x++) value.push(x.toString()); // [0,...,255]
            // packedEncoding = cbor.encode(...value);
            // encoding = encodeCBOR(
            //     MAJOR_TYPE_MAPPING,
            //     SHORT_COUNT_2_BYTES,
            //     value.length / 2,
            //     packedEncoding
            // );
            // decoded = await decoder.testDecodeCBORMapping(encoding, {
            //     gasLimit: 300_000_000,
            // });
            // // Assert all keys are equal
            // expect(decoded).to.deep.equal(
            //     toExpectedValue(listToMapping(value))
            // );

            // Indefinite length array
            value = [];
            for (let x = 0; x < 50; x++) value.push(x.toString()); // [0,...,49]
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_MAPPING,
                SHORT_COUNT_INDEFNITE,
                undefined,
                packedEncoding,
                true // endWithMarker
            );
            decoded = await decoder.testDecodeCBORMapping(encoding);
            // Assert all keys are equal
            expect(decoded).to.deep.equal(
                toExpectedValue(listToMapping(value))
            );
        });

        it("Nested mapping", async function () {
            value = ["3", { "4": { "10": "125" } }, "5", { "6": "7" }];
            packedEncoding = cbor.encode(...value);
            encoding = encodeCBOR(
                MAJOR_TYPE_MAPPING,
                value.length / 2,
                undefined,
                packedEncoding
            );
            decoded = await decoder.testDecodeCBORMapping(encoding);
            // Assert keys equal
            expect(decoded).to.deep.equal(
                toExpectedValue(listToMapping(value))
            );
        });

        it("Invalid RFC", async () => {
            // Invalid code
            encoding = encodeCBOR(MAJOR_TYPE_MAPPING, 30);
            await expect(
                decoder.testDecodeCBORMapping(encoding)
            ).to.be.revertedWith("Invalid data structure RFC Shortcode!");
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
    });
});
