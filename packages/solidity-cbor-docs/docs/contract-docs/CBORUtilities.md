

## CBORUtilities

_Solidity library built for decoding CBOR data._

### parseField

```solidity
function parseField(bytes encoding, uint256 cursor) internal view returns (enum CBORSpec.MajorType majorType, uint8 shortCount, uint256 start, uint256 end, uint256 next)
```

_Intelligently parses supported CBOR-encoded types._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array |
| cursor | uint256 | position where type starts (in bytes) |

| Name | Type | Description |
| ---- | ---- | ----------- |
| majorType | enum CBORSpec.MajorType | the type of the data sliced |
| shortCount | uint8 | the corresponding shortCount for the data |
| start | uint256 | position where the data starts (in bytes) |
| end | uint256 | position where the data ends (in bytes) |
| next | uint256 | position to find the next field (in bytes) |

### extractValue

```solidity
function extractValue(bytes encoding, enum CBORSpec.MajorType majorType, uint8 shortCount, uint256 start, uint256 end) internal view returns (bytes value)
```

_Extracts the data from CBOR-encoded type._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to slice from |
| majorType | enum CBORSpec.MajorType | the correspondnig data type being used |
| shortCount | uint8 |  |
| start | uint256 | position where type starts (in bytes) |
| end | uint256 | position where the type ends (in bytes) |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | bytes | a cloned dynamic bytes array with the data value |

### parseFieldEncoding

```solidity
function parseFieldEncoding(bytes1 fieldEncoding) internal view returns (enum CBORSpec.MajorType majorType, uint8 shortCount)
```

_Parses a CBOR byte into major type and short count.
See https://en.wikipedia.org/wiki/CBOR for reference._

| Name | Type | Description |
| ---- | ---- | ----------- |
| fieldEncoding | bytes1 | the field to encode |

| Name | Type | Description |
| ---- | ---- | ----------- |
| majorType | enum CBORSpec.MajorType | corresponding data type (see RFC8949 section 3.2) |
| shortCount | uint8 | corresponding short count (see RFC8949 section 3) |

### scanIndefiniteItems

```solidity
function scanIndefiniteItems(bytes encoding, uint256 cursor, uint256 maxItems) internal view returns (uint256 totalItems, uint256 endCursor)
```

If data structures are nested, this will be a recursive function.

_Counts encoded items until a BREAK or the end of the bytes._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the encoded bytes array |
| cursor | uint256 | where to start scanning |
| maxItems | uint256 | once this number of items is reached, return. Set 0 for infinite |

| Name | Type | Description |
| ---- | ---- | ----------- |
| totalItems | uint256 | total items found in encoding |
| endCursor | uint256 | cursor position after scanning (non-inclusive) |

