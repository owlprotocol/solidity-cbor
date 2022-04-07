//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import { CBORSpec as Spec } from "./components/CBORSpec.sol";
import { CBORPrimitives as Primitives } from "./components/CBORPrimitives.sol";
import { CBORUtilities as Utils } from "./components/CBORUtilities.sol";
import { CBORDataStructures as DataStructures } from "./components/CBORDataStructures.sol";
import { CBORByteUtils as ByteUtils } from "./components/CBORByteUtils.sol";

/**
 * @dev Solidity library built for decoding CBOR data.
 *
 */
library CBORDecoding {

    /************
     * Mappings *
     ***********/

    /**
     * @dev Parses an encoded CBOR Mapping into a 2d array of data
     * @param encoding Encoded CBOR bytes data
     * @return decodedData Decoded CBOR data (returned in 2d array).
     * Interpretting this bytes data from bytes to it's proper object is up
     * to the implementer.
     */
    function decodeMapping(
        bytes memory encoding
    ) external view returns(
        bytes[2][] memory decodedData
    ) {
        uint cursor = 0;
        // Type check
        (Spec.MajorType majorType, uint8 shortCount) = Utils.parseFieldEncoding(encoding[cursor]);
        require(majorType == Spec.MajorType.Map, "Object is not a mapping!");

        // Decode and return
        decodedData = DataStructures.expandMapping(encoding, cursor, shortCount);
        return decodedData;
    }

    /**********
     * Arrays *
     *********/

    /**
     * @dev Parses an encoded CBOR array into a bytes array of its data
     * @param encoding Encoded CBOR bytes data
     * @return decodedData Decoded CBOR data (returned in array).
     * Interpretting this bytes data from bytes to it's proper object is up
     * to the implementer.
     */
    function decodeArray(
        bytes memory encoding
    ) external view returns(
        bytes[] memory decodedData
    ) {
        uint cursor = 0;
        // Type check
        (Spec.MajorType majorType, uint8 shortCount) = Utils.parseFieldEncoding(encoding[cursor]);
        require(majorType == Spec.MajorType.Array, "Object is not an array!");

        // Decode and return
        decodedData = DataStructures.expandArray(encoding, cursor, shortCount);
        return decodedData;
    }

    /**************
     * Primitives *
     *************/

    /**
     * @dev Parses an encoded CBOR dynamic bytes array into it's array of data
     * @param encoding Encoded CBOR bytes data
     * @return decodedData Decoded CBOR data (returned in structs).
     * Interpretting this bytes data from bytes to it's proper object is up
     * to the implementer.
     */
    function decodePrimitive(
        bytes memory encoding
    ) external view returns(
        bytes memory decodedData
    ) {
        uint cursor = 0;
        // See what our field looks like
        (Spec.MajorType majorType, uint8 shortCount, uint start, uint end, uint next) = Utils.parseField(encoding, cursor);
        require(
            majorType != Spec.MajorType.Array &&
            majorType != Spec.MajorType.Map,
            "Encoding is not a primitive!"
        );

        // Save our data
        decodedData = Utils.extractValue(encoding, majorType, shortCount, start, end);
        return decodedData;
    }

    // // /**********************
    // //  * Searching Mappings *
    // //  *********************/

    // /**
    //  * @dev Performs linear search through mapping for a key.
    //  * This is much cheaper than decoding an entire mapping and
    //  * then searching through it for a key.
    //  * @param encoding encoded CBOR bytes data
    //  * @param searchKey key to search for
    //  * @return value decoded CBOR data as bytes
    //  */
    // function decodeMappingGetValue(
    //     bytes memory encoding,
    //     bytes memory searchKey
    // ) external view returns(
    //     bytes memory value
    // ) {
    //     // Ensure we start with a mapping
    //     bytes32 searchKeyHash = keccak256(searchKey);
    //     bool keyFound = false;

    //     // Scan through our data
    //     for ((uint cursor, uint itemIdx) = (end, 0); cursor < encoding.length; itemIdx++) {

    //         // Skip every other item
    //         if (!keyFound && itemIdx % 2 != 0)
    //             continue;

    //         // Grab a key and it's value
    //         (Spec.MajorType majorType, uint8 shortCount, uint start, uint end, uint next) = Utils.parseField(encoding, cursor);
    //         bytes memory currentItem = Utils.extractValue(encoding, majorType, shortCount, start, end);

    //         // If we found our key last iteration, this is our value (so we can return)
    //         if (keyFound)
    //             return currentItem;

    //         // This will trigger the item to be returned next time
    //         if (keccak256(currentItem) == searchKeyHash)
    //             keyFound = true;

    //         // Update our cursor
    //         cursor = next;

    //     }
    //     // If the key doesn't exist, revert
    //     revert("Key not found!");
    // }

    // /********************
    //  * Searching Arrays *
    //  *******************/

    // /**
    //  * @dev Performs linear search through array for a key.
    //  * If the data exists, it returns an index and the start/end
    //  * bytes for the data.
    //  * @param encoding encoded CBOR bytes data
    //  * @param searchKey key to search for
    //  * @return index item position in items where item exists
    //  * @return dataStart byte position where data starts
    //  * @return dataEnd byte position where data ends (non-inclusive)
    //  */
    // function decodeArrayGetItemIndex(
    //     bytes memory encoding,
    //     bytes memory searchKey
    // ) external view returns(
    //     uint64 index,
    //     uint256 dataStart,
    //     uint256 dataEnd
    // ) {
    //     // Ensure we start with a mapping
    //     bytes32 searchKeyHash = keccak256(searchKey);

    //     // Type check
    //     (Spec.MajorType majorType, /*uint8 shortCount*/, /*uint start*/, uint end,/* uint next*/) = Utils.parseField(encoding, 0);
    //     require(majorType == Spec.MajorType.Array, "Object is not an array!");

    //     // Scan through our data
    //     for ((uint cursor, uint64 itemIdx) = (end, 0); cursor < encoding.length; itemIdx++) {

    //         // Grab a key and it's value
    //         (Spec.MajorType majorType, uint8 shortCount, uint start, uint end, uint next) = Utils.parseField(encoding, cursor);
    //         bytes memory currentItem = Utils.extractValue(encoding, majorType, shortCount, start, end);

    //         // This will trigger the item to be returned next time
    //         if (keccak256(currentItem) == searchKeyHash)
    //             return (itemIdx, start, end);

    //         // Update our cursor
    //         cursor = next;

    //     }
    //     // If the key doesn't exist, revert
    //     revert("Item not found!");
    // }

    // /**
    //  * @dev Returns the value of the Nth item in an array.
    //  * @param encoding encoded CBOR bytes data
    //  * @param index Nth item index to grab
    //  * @return value decoded CBOR data as bytes
    //  */
    // function decodeArrayGetItem(
    //     bytes memory encoding,
    //     uint64 index
    // ) external view returns(
    //     bytes memory value
    // ) {
    //     // // Type check
    //     // (Spec.MajorType majorType, uint8 shortCount, uint start, uint end, uint next) = Utils.parseField(encoding, 0);
    //     // require(majorType == Spec.MajorType.Array, "Object is not an array!");

    //     // Scan through our data
    //     for ((uint cursor, uint itemIdx) = (end, 0); cursor < encoding.length; itemIdx++) {

    //         // Grab the current item info, move cursor
    //         (Spec.MajorType majorType, uint8 shortCount, uint start, uint end, uint next) = Utils.parseField(encoding, cursor);
    //         cursor = next;

    //         // If it's not at the index we're looking for, skip
    //         if (index != itemIdx)
    //             continue;

    //         // Otherwise we can grab our item now
    //         value = Utils.extractValue(encoding, majorType, shortCount, start, end);
    //         return value;
    //     }
    //     // If the index doesn't exist in list, revert
    //     revert("Item not found!");
    // }


}
