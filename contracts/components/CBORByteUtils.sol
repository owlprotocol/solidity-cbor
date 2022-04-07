//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**
 * @dev Helpful byte utility functions.
 *
 */
library CBORByteUtils {

    /**
     * @dev Slices a dynamic bytes object from start:end (non-inclusive end)
     * @param start position to start byte slice (inclusive)
     * @param end position to end byte slice (non-inclusive)
     * @return slicedData dynamic sliced bytes object
     */
    function sliceBytesMemory(
        bytes memory data,
        uint start,
        uint end
    ) internal view returns (
        bytes memory slicedData
    ) {
        // Slice our bytes
        for (uint i = start; i < end; i++)
            slicedData = abi.encodePacked(slicedData, data[i]);
    }

    /**
     * @dev Converts a dynamic bytes array to a uint256
     * @param data dynamic bytes array
     * @return value calculated uint256 value
     */
    function bytesToUint256(
        bytes memory data
    ) internal view returns (
        uint256 value
    ) {
        for (uint i = 0; i < data.length; i++)
            value += uint8(data[i])*(2**(8*(data.length-(i+1))));
    }

    // /*
    //  The following function has been written by Alex Beregszaszi, use it under the terms of the MIT license
    // */
    // function copyBytes(bytes memory _from, uint _fromOffset, uint _length, bytes memory _to, uint _toOffset) internal view returns (bytes memory _copiedBytes) {
    //     uint minLength = _length + _toOffset;
    //     require(_to.length >= minLength); // Buffer too small. Should be a better way?
    //     uint i = 32 + _fromOffset; // NOTE: the offset 32 is added to skip the `size` field of both bytes variables
    //     uint j = 32 + _toOffset;
    //     while (i < (32 + _fromOffset + _length)) {
    //         assembly {
    //             let tmp := mload(add(_from, i))
    //             mstore(add(_to, j), tmp)
    //         }
    //         i += 32;
    //         j += 32;
    //     }
    //     return _to;
    // }
}
