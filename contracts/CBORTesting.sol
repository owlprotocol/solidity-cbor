//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@ensdomains/buffer/contracts/Buffer.sol";

import "./CBOREncoding.sol";
import "./CBORDecoding.sol";
import "./ByteParser.sol";

/**
 * @dev Documentation for contract.
 *
 */
contract CBORTesting {

    using Buffer for Buffer.buffer;

    bool private _state = false;

    function testDecodeCBORMapping(bytes memory encoding) public view returns (bytes[2][] memory decodedData) {
        return CBORDecoding.decodeMapping(encoding);
    }

    // function testDecodeCBORMappingGetValue(bytes memory encoding, bytes memory key) public view returns (bytes memory value) {
    //     return CBORDecoding.decodeMappingGetValue(encoding, key);
    // }

    function testDecodeCBORPrimitive(bytes memory encoding) public view returns (bytes memory decodedData) {
        return CBORDecoding.decodePrimitive(encoding);
    }

    function testDecodeCBORArray(bytes memory encoding) public view returns (bytes[] memory decodedData) {
        return CBORDecoding.decodeArray(encoding);
    }

    function statefulTestDecodeCBORMapping(bytes memory encoding) public returns (bytes[2][] memory decodedData) {
        _state = !_state; // Call some state to measure how expensive our computations are
        return CBORDecoding.decodeMapping(encoding);
    }

    function testBytesToNegativeInt128(bytes memory encoding) public view returns (int128) {
        return ByteParser.bytesToNegativeInt128(encoding);
    }

    function testBytesToUint64(bytes memory encoding) public view returns (uint64) {
        return ByteParser.bytesToUint64(encoding);
    }

    function testBytesToString(bytes memory encoding) public view returns (string memory) {
        return ByteParser.bytesToString(encoding);
    }

    function testBytesToBigNumber(bytes memory encoding) public view returns (uint256 value) {
        return ByteParser.bytesToBigNumber(encoding);
    }

    function testBytesToBool(bytes memory encoding) public view returns (bool state) {
        return ByteParser.bytesToBool(encoding);
    }

}
