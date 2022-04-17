

## CBORDataStructures

_Solidity library built for decoding CBOR data._

### expandMapping

```solidity
function expandMapping(bytes encoding, uint256 cursor, uint8 shortCount) internal view returns (bytes[2][] decodedMapping)
```

_Parses a CBOR-encoded mapping into a 2d-array of bytes._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where mapping starts (in bytes) |
| shortCount | uint8 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| decodedMapping | bytes[2][] | the mapping decoded |

### expandArray

```solidity
function expandArray(bytes encoding, uint256 cursor, uint8 shortCount) internal view returns (bytes[] decodedArray)
```

_Parses a CBOR-encoded array into an array of bytes._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where array starts (in bytes) |
| shortCount | uint8 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| decodedArray | bytes[] | the array decoded |

### parseDataStructure

```solidity
function parseDataStructure(bytes encoding, uint256 cursor, enum CBORSpec.MajorType majorType, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Returns the number of items (not pairs) and where values start/end._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where mapping data starts (in bytes) |
| majorType | enum CBORSpec.MajorType | the corresponding major type identifier |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | the position where the values for the structure begin. |
| dataEnd | uint256 | the position where the values for the structure end. |

### getDataStructureItemLength

```solidity
function getDataStructureItemLength(bytes encoding, uint256 cursor, enum CBORSpec.MajorType majorType, uint256 shortCount) internal view returns (uint256 totalItems, uint256 dataStart, uint256 dataEnd)
```

Use &#x60;parseDataStructure&#x60; instead. This is for internal usage.
Please take care when using &#x60;dataEnd&#x60;! This value is ONLY set if the data
structure uses an indefinite amount of items, optimizing the efficiency when
doing an initial scan to allocate arrays. If the value is not 0, the value
can be relied on.

_Returns the number of items (not pairs) in a data structure._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where mapping starts (in bytes) |
| majorType | enum CBORSpec.MajorType | the corresponding major type identifier |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| totalItems | uint256 | the number of total items in the data structure |
| dataStart | uint256 | the position where the values for the structure begin. |
| dataEnd | uint256 | the position where the values for the structure end. |

## CBORDataStructures

_Solidity library built for decoding CBOR data._

### expandMapping

```solidity
function expandMapping(bytes encoding, uint256 cursor, uint8 shortCount) internal view returns (bytes[2][] decodedMapping)
```

_Parses a CBOR-encoded mapping into a 2d-array of bytes._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where mapping starts (in bytes) |
| shortCount | uint8 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| decodedMapping | bytes[2][] | the mapping decoded |

### expandArray

```solidity
function expandArray(bytes encoding, uint256 cursor, uint8 shortCount) internal view returns (bytes[] decodedArray)
```

_Parses a CBOR-encoded array into an array of bytes._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where array starts (in bytes) |
| shortCount | uint8 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| decodedArray | bytes[] | the array decoded |

### parseDataStructure

```solidity
function parseDataStructure(bytes encoding, uint256 cursor, enum CBORSpec.MajorType majorType, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Returns the number of items (not pairs) and where values start/end._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where mapping data starts (in bytes) |
| majorType | enum CBORSpec.MajorType | the corresponding major type identifier |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | the position where the values for the structure begin. |
| dataEnd | uint256 | the position where the values for the structure end. |

### getDataStructureItemLength

```solidity
function getDataStructureItemLength(bytes encoding, uint256 cursor, enum CBORSpec.MajorType majorType, uint256 shortCount) internal view returns (uint256 totalItems, uint256 dataStart, uint256 dataEnd)
```

Use &#x60;parseDataStructure&#x60; instead. This is for internal usage.
Please take care when using &#x60;dataEnd&#x60;! This value is ONLY set if the data
structure uses an indefinite amount of items, optimizing the efficiency when
doing an initial scan to allocate arrays. If the value is not 0, the value
can be relied on.

_Returns the number of items (not pairs) in a data structure._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where mapping starts (in bytes) |
| majorType | enum CBORSpec.MajorType | the corresponding major type identifier |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| totalItems | uint256 | the number of total items in the data structure |
| dataStart | uint256 | the position where the values for the structure begin. |
| dataEnd | uint256 | the position where the values for the structure end. |

