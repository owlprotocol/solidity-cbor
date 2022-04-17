

## CBORPrimitives

_Parses out CBOR primitive values
&#x60;CBORDataStructures.sol&#x60; handles hashes and arrays._

### parseInteger

```solidity
function parseInteger(uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded integer and determines where data start/ends._

| Name | Type | Description |
| ---- | ---- | ----------- |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

### parseString

```solidity
function parseString(bytes encoding, uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded strings and determines where data start/ends._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

### parseSemantic

```solidity
function parseSemantic(bytes encoding, uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded tag type (big nums)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

### parseSpecial

```solidity
function parseSpecial(uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded special type._

| Name | Type | Description |
| ---- | ---- | ----------- |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

## CBORPrimitives

_Parses out CBOR primitive values
&#x60;CBORDataStructures.sol&#x60; handles hashes and arrays._

### parseInteger

```solidity
function parseInteger(uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded integer and determines where data start/ends._

| Name | Type | Description |
| ---- | ---- | ----------- |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

### parseString

```solidity
function parseString(bytes encoding, uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded strings and determines where data start/ends._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

### parseSemantic

```solidity
function parseSemantic(bytes encoding, uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded tag type (big nums)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| encoding | bytes | the dynamic bytes array to scan |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

### parseSpecial

```solidity
function parseSpecial(uint256 cursor, uint256 shortCount) internal view returns (uint256 dataStart, uint256 dataEnd)
```

_Parses a CBOR-encoded special type._

| Name | Type | Description |
| ---- | ---- | ----------- |
| cursor | uint256 | position where integer starts (in bytes) |
| shortCount | uint256 | short data identifier included in field info |

| Name | Type | Description |
| ---- | ---- | ----------- |
| dataStart | uint256 | byte position where data starts |
| dataEnd | uint256 | byte position where data ends |

