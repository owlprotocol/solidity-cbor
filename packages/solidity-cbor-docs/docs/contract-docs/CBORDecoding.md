

## CBORDecoding

_Solidity library built for decoding CBOR data._

### decodeMapping

```solidity
function decodeMapping(bytes encoding) external view returns (bytes[2][] decodedData)
```

_Parses an encoded CBOR Mapping into a 2d array of data_

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | Encoded CBOR bytes data |

| Name | Type | Description |
| ---- | ---- | ----------- |
| decodedData | bytes[2][] | Decoded CBOR data (returned in 2d array). Interpretting this bytes data from bytes to it&#x27;s proper object is up to the implementer. |

### decodeArray

```solidity
function decodeArray(bytes encoding) external view returns (bytes[] decodedData)
```

_Parses an encoded CBOR array into a bytes array of its data_

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | Encoded CBOR bytes data |

| Name | Type | Description |
| ---- | ---- | ----------- |
| decodedData | bytes[] | Decoded CBOR data (returned in array). Interpretting this bytes data from bytes to it&#x27;s proper object is up to the implementer. |

### decodePrimitive

```solidity
function decodePrimitive(bytes encoding) external view returns (bytes decodedData)
```

_Parses an encoded CBOR dynamic bytes array into it&#x27;s array of data_

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | Encoded CBOR bytes data |

| Name | Type | Description |
| ---- | ---- | ----------- |
| decodedData | bytes | Decoded CBOR data (returned in structs). Interpretting this bytes data from bytes to it&#x27;s proper object is up to the implementer. |

### decodeMappingGetValue

```solidity
function decodeMappingGetValue(bytes encoding, bytes searchKey) external view returns (bytes value)
```

_Performs linear search through mapping for a key.
This is much cheaper than decoding an entire mapping and
then searching through it for a key._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | encoded CBOR bytes data |
| searchKey | bytes | key to search for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | bytes | decoded CBOR data as bytes |

### decodeArrayGetIndex

```solidity
function decodeArrayGetIndex(bytes encoding, bytes searchKey) external view returns (uint64 index)
```

_Performs linear loop through a CBOR array
     until &#x60;searchKey&#x60; is found, and returns the corresponding index._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | encoded CBOR bytes data |
| searchKey | bytes | key to search for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint64 | item position in items where item exists |

### decodeArrayGetItem

```solidity
function decodeArrayGetItem(bytes encoding, uint64 index) external view returns (bytes value)
```

_Returns the value of the Nth item in an array._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | encoded CBOR bytes data |
| index | uint64 | Nth item index to grab |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | bytes | decoded CBOR data as bytes |

