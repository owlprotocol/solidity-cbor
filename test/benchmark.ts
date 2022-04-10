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
import { toHex } from "web3-utils";

const BENCHMARK = process.env.BENCHMARK?.toLowerCase() === "true";

// Enable / disable with `BENCHMARK` environment variable
(BENCHMARK ? describe.only : describe.skip)("Benchmark gas usage", function () {
    this.timeout(60_000);

    const mapping = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
    const array = [1, 2, 3, 4, 5, 6, 7, "a", "b", "c", "d", "e"];
    const primitive = "Hello world!";

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

    it("Baseline control costs", async () => {
        await decoder.baselineStateChange();
    });

    it("Decode Mapping", async () => {
        await decoder.statefulTestDecodeCBORMapping(cbor.encode(mapping));
    });

    it("Decode Mapping Get Value", async () => {
        await decoder.statefulTestDecodeCBORMappingGetValue(
            cbor.encode(mapping),
            toHex("h")
        );
    });

    it("Decode Array Get Index", async () => {
        await decoder.statefulTestDecodeCBORArrayGetIndex(
            cbor.encode(array),
            toHex("e")
        );
    });

    it("Decode Array Get Item", async () => {
        await decoder.statefulTestDecodeCBORArrayGetItem(
            cbor.encode(array),
            11
        );
    });

    it("Decode Array", async () => {
        await decoder.statefulTestDecodeCBORArray(cbor.encode(array));
    });

    it("Decode Primitive", async () => {
        await decoder.statefulTestDecodeCBORPrimitive(cbor.encode(primitive));
    });
});
