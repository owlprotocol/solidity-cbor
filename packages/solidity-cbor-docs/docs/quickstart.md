---
sidebar_position: 2
slug: '/quickstart'
---

# Quickstart


Looking for some example code to jump right in? This is the right place.

First you'll want to import the library into your solidity contract:

```C++
import "@owlprotocol/solidity-cbor/CBORDecoding.sol";
```

## Parsing Results

All parsed values will be returned in the form of `bytes memory`. You can use the `ByteParser.sol` helper functions in order to parse these into native Solidity types:

```C++
import "@owlprotocol/solidity-cbor/ByteParser.sol";
```

See [this reference](./contract-docs/ByteParser) for a list of useful parsing functions.

## Decoding Mappings
Since Solidity has no concept of in-memory hashes, we leverage 2d-arrays instead. The first item in a pair is a key and the second is the value.

Suppose your mapping looks like:
```javascript
> const mapping = { "1": "2", "3": "4", "5": "6", "7": "8" };
> const encodedMapping = cbor.encode(mapping);
> "0x" + encodedMapping.toString("hex");
// This cbor is what's passed to the library
'0xa461316132613361346135613661376138'
```

If you're retreiving two or less values from a mapping, it's less expensive (gas) to call `decodeMappingGetValue`:

[`CBORDecoding.decodeMappingGetValue(<[bytes memory] encodedMapping>, <[bytes memory] "7">)`](./contract-docs/CBORDecoding#decodeMappingGetValue) will return the following:
```C++
0x38 // This is the bytes (UTF-8) representation of "8"
```

If you need more than two values from a mapping, it's better to decode the entire mapping with `decodeMapping` and index elements individually:


[`CBORDecoding.decodeMapping(<[bytes memory] encodedMapping>);`](./contract-docs/CBORDecoding#decodeMapping) will return the following:
```C++
[
// [key[0], value[1]]
    ["0x31","0x32"], // item [0]
    ["0x33","0x34"], // item [1]
    ["0x35","0x36"], // item [2]
    ["0x37","0x38"]  // item [3]
]
```

## Decoding Arrays

Suppose your array looks like:
```javascript
> const array = [1, 2, 3, 4, 5, 6, 7, 8];
> const encodedArray = cbor.encode(array);
> "0x" + encodedArray.toString("hex");
// This cbor is what's passed to the library
'0x880102030405060708'
```

If you're retreiving two or less values from an array, it's less expensive (gas) to call `decodeArrayGetItem`:

[`CBORDecoding.decodeArrayGetItem(<[bytes memory] encodedArray>, [uint64] 2)`](./contract-docs/CBORDecoding#decodeArrayGetItem) will return the following:
```C++
0x03 // This is the bytes representation of array[2]
```

If you need more than two values from an array, it's better to decode the entire array with `decodeArray` and index elements individually:


[`CBORDecoding.decodeArray(<[bytes memory] encodedArray>);`](./contract-docs/CBORDecoding#decodeArray) will return the following:
```C++
["0x01","0x02","0x03","0x04","0x05","0x06","0x07","0x08"]
```

If you need to search an array for the index of an item, you can also do that with `decodeArrayGetIndex`:

[`CBORDecoding.decodeArrayGetIndex(<[bytes memory] encodedArray>, <[bytes memory] "0x03">)`](./contract-docs/CBORDecoding#decodeArrayGetItem) will return the following:

```C++
2
```

## Contract Example

See [this contract](https://github.com/owlprotocol/react-snake-game/blob/develop/solidity/contracts/SnakeGameRewards.sol) for a real contract example.

## Full Reference

The full reference of decoding methods can be found [here](./contract-docs/CBORDecoding#CBORDecoding).
