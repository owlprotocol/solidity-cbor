

## CBOR

### CBORBuffer

```solidity
struct CBORBuffer {
  struct Buffer.buffer buf;
  uint256 depth;
}
```

### MAJOR_TYPE_INT

```solidity
uint8 MAJOR_TYPE_INT
```

### MAJOR_TYPE_NEGATIVE_INT

```solidity
uint8 MAJOR_TYPE_NEGATIVE_INT
```

### MAJOR_TYPE_BYTES

```solidity
uint8 MAJOR_TYPE_BYTES
```

### MAJOR_TYPE_STRING

```solidity
uint8 MAJOR_TYPE_STRING
```

### MAJOR_TYPE_ARRAY

```solidity
uint8 MAJOR_TYPE_ARRAY
```

### MAJOR_TYPE_MAP

```solidity
uint8 MAJOR_TYPE_MAP
```

### MAJOR_TYPE_TAG

```solidity
uint8 MAJOR_TYPE_TAG
```

### MAJOR_TYPE_CONTENT_FREE

```solidity
uint8 MAJOR_TYPE_CONTENT_FREE
```

### TAG_TYPE_BIGNUM

```solidity
uint8 TAG_TYPE_BIGNUM
```

### TAG_TYPE_NEGATIVE_BIGNUM

```solidity
uint8 TAG_TYPE_NEGATIVE_BIGNUM
```

### CBOR_FALSE

```solidity
uint8 CBOR_FALSE
```

### CBOR_TRUE

```solidity
uint8 CBOR_TRUE
```

### CBOR_NULL

```solidity
uint8 CBOR_NULL
```

### CBOR_UNDEFINED

```solidity
uint8 CBOR_UNDEFINED
```

### create

```solidity
function create(uint256 capacity) internal pure returns (struct CBOR.CBORBuffer cbor)
```

### data

```solidity
function data(struct CBOR.CBORBuffer buf) internal pure returns (bytes)
```

### writeUInt256

```solidity
function writeUInt256(struct CBOR.CBORBuffer buf, uint256 value) internal pure
```

### writeInt256

```solidity
function writeInt256(struct CBOR.CBORBuffer buf, int256 value) internal pure
```

### writeUInt64

```solidity
function writeUInt64(struct CBOR.CBORBuffer buf, uint64 value) internal pure
```

### writeInt64

```solidity
function writeInt64(struct CBOR.CBORBuffer buf, int64 value) internal pure
```

### writeBytes

```solidity
function writeBytes(struct CBOR.CBORBuffer buf, bytes value) internal pure
```

### writeString

```solidity
function writeString(struct CBOR.CBORBuffer buf, string value) internal pure
```

### writeBool

```solidity
function writeBool(struct CBOR.CBORBuffer buf, bool value) internal pure
```

### writeNull

```solidity
function writeNull(struct CBOR.CBORBuffer buf) internal pure
```

### writeUndefined

```solidity
function writeUndefined(struct CBOR.CBORBuffer buf) internal pure
```

### startArray

```solidity
function startArray(struct CBOR.CBORBuffer buf) internal pure
```

### startFixedArray

```solidity
function startFixedArray(struct CBOR.CBORBuffer buf, uint64 length) internal pure
```

### startMap

```solidity
function startMap(struct CBOR.CBORBuffer buf) internal pure
```

### startFixedMap

```solidity
function startFixedMap(struct CBOR.CBORBuffer buf, uint64 length) internal pure
```

### endSequence

```solidity
function endSequence(struct CBOR.CBORBuffer buf) internal pure
```

### writeKVString

```solidity
function writeKVString(struct CBOR.CBORBuffer buf, string key, string value) internal pure
```

### writeKVBytes

```solidity
function writeKVBytes(struct CBOR.CBORBuffer buf, string key, bytes value) internal pure
```

### writeKVUInt256

```solidity
function writeKVUInt256(struct CBOR.CBORBuffer buf, string key, uint256 value) internal pure
```

### writeKVInt256

```solidity
function writeKVInt256(struct CBOR.CBORBuffer buf, string key, int256 value) internal pure
```

### writeKVUInt64

```solidity
function writeKVUInt64(struct CBOR.CBORBuffer buf, string key, uint64 value) internal pure
```

### writeKVInt64

```solidity
function writeKVInt64(struct CBOR.CBORBuffer buf, string key, int64 value) internal pure
```

### writeKVBool

```solidity
function writeKVBool(struct CBOR.CBORBuffer buf, string key, bool value) internal pure
```

### writeKVNull

```solidity
function writeKVNull(struct CBOR.CBORBuffer buf, string key) internal pure
```

### writeKVUndefined

```solidity
function writeKVUndefined(struct CBOR.CBORBuffer buf, string key) internal pure
```

### writeKVMap

```solidity
function writeKVMap(struct CBOR.CBORBuffer buf, string key) internal pure
```

### writeKVArray

```solidity
function writeKVArray(struct CBOR.CBORBuffer buf, string key) internal pure
```

### writeFixedNumeric

```solidity
function writeFixedNumeric(struct CBOR.CBORBuffer buf, uint8 major, uint64 value) private pure
```

### writeIndefiniteLengthType

```solidity
function writeIndefiniteLengthType(struct CBOR.CBORBuffer buf, uint8 major) private pure
```

### writeDefiniteLengthType

```solidity
function writeDefiniteLengthType(struct CBOR.CBORBuffer buf, uint8 major, uint64 length) private pure
```

### writeContentFree

```solidity
function writeContentFree(struct CBOR.CBORBuffer buf, uint8 value) private pure
```

