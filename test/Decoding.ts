/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { expect } from "chai";
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
import { toExpectedValue } from "./helpers/testUtils";
import { ContractFactory } from "ethers/lib/ethers";

describe("CBORDecoding.sol", function () {
    this.timeout(60_000);

    let decoder: CBORTesting;
    // eslint-disable-next-line camelcase
    let CBORTestingFactory: CBORTesting__factory;
    // eslint-disable-next-line camelcase
    let CBORDecodingFactory: CBORDecoding__factory;
    let ByteParserFactory: ContractFactory;

    let value;
    let decoded;
    let call;

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

    describe("Search Mappings", async () => {
        it("Linear search decode mapping", async function () {
            value = { a: 1, b: 2, c: 3 };
            // Good call
            decoded = await decoder.testDecodeCBORMappingGetValue(
                cbor.encode(value),
                toHex("b")
            );
            expect(decoded).to.equal(toExpectedValue(value.b));
        });

        it("Linear search decode mapping - key not found", async () => {
            value = { a: 1, b: 2, c: 3 };
            // Bad call
            call = decoder.testDecodeCBORMappingGetValue(
                cbor.encode(value),
                toHex("x")
            );
            await expect(call).to.be.revertedWith("Key not found!");
        });

        it("Linear search decode mapping - bad type", async () => {
            value = [1, 2, 3];
            // Bad type
            call = decoder.testDecodeCBORMappingGetValue(
                cbor.encode(value),
                toHex("b")
            );
            await expect(call).to.be.revertedWith("Object is not a mapping!");
        });
    });

    describe("Search Arrays", async () => {
        it("Linear Get Index", async function () {
            value = ["a", "b", "c", "d"];
            // Good call
            decoded = await decoder.testDecodeCBORArrayGetIndex(
                cbor.encode(value),
                toHex("d")
            );
            expect(decoded).to.equal(value.indexOf("d"));
        });

        it("Linear Get Index - key not found", async () => {
            value = ["a", "b", "c", "d"];
            // Bad call
            call = decoder.testDecodeCBORArrayGetIndex(
                cbor.encode(value),
                toHex("x")
            );
            await expect(call).to.be.revertedWith("Item not found!");
        });

        it("Linear Get Index - bad type", async () => {
            value = { "1": "2" };
            // Bad call
            const call = decoder.testDecodeCBORArrayGetIndex(
                cbor.encode(value),
                toHex("x")
            );
            await expect(call).to.be.revertedWith("Object is not an array!");
        });

        it("Linear Get Item", async () => {
            value = ["a", "b", "c", "d"];
            // Good call
            decoded = await decoder.testDecodeCBORArrayGetItem(
                cbor.encode(value),
                3
            );
            expect(decoded).to.equal(toExpectedValue(value[3]));
        });

        it("Linear Get Item - index not found", async () => {
            value = ["a", "b", "c", "d"];
            // Bad call
            call = decoder.testDecodeCBORArrayGetItem(cbor.encode(value), 5);
            await expect(call).to.be.revertedWith(
                "Index provided larger than list!"
            );
        });

        it("Linear Get Item - bad type", async () => {
            value = { 1: 2 };
            // Bad call
            call = decoder.testDecodeCBORArrayGetItem(cbor.encode(value), 1);
            await expect(call).to.be.revertedWith("Object is not an array!");
        });
    });
});
