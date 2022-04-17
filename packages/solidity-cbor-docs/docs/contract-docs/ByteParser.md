

## ByteParser

_Helpful byte utility functions.
Returns decoded CBOR values as their proper types._

### MAX_UINT64

```solidity
uint256 MAX_UINT64
```

### bytesToUint64

```solidity
function bytesToUint64(bytes data) public pure returns (uint64 value)
```

_Converts a CBOR dynamic bytes array to a uint64_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | dynamic bytes array |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | uint64 | calculated uint64 value |

### bytesToNegativeInt128

```solidity
function bytesToNegativeInt128(bytes data) public pure returns (int128 value)
```

_Converts a CBOR dynamic bytes array to an int128_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | dynamic bytes array |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | int128 | calculated uint64 value |

### bytesToString

```solidity
function bytesToString(bytes data) public pure returns (string value)
```

_Converts a CBOR dynamic bytes array to a string_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | dynamic bytes array |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | string | converted string object |

### bytesToBigNumber

```solidity
function bytesToBigNumber(bytes data) public pure returns (uint256 value)
```

_Converts a CBOR dynamic bytes array to a uint256_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | dynamic bytes array |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | uint256 | calculated uint256 value |

### bytesToBool

```solidity
function bytesToBool(bytes data) public pure returns (bool value)
```

_Converts a CBOR dynamic bytes array to a bool_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | dynamic bytes array |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | bool | calculated bool value |

### parseAddr

```solidity
function parseAddr(bytes data) public pure returns (address value)
```

_Converts a CBOR dynamic bytes array to an address type_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | dynamic bytes array |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | address | translated address |

