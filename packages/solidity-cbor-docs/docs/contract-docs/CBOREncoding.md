

## CBOREncoding

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

### encodeFixedNumeric

```solidity
function encodeFixedNumeric(struct Buffer.buffer buf, uint8 major, uint64 value) private view
```

### encodeIndefiniteLengthType

```solidity
function encodeIndefiniteLengthType(struct Buffer.buffer buf, uint8 major) private view
```

### encodeUInt

```solidity
function encodeUInt(struct Buffer.buffer buf, uint256 value) internal view
```

### encodeInt

```solidity
function encodeInt(struct Buffer.buffer buf, int256 value) internal view
```

### encodeBytes

```solidity
function encodeBytes(struct Buffer.buffer buf, bytes value) internal view
```

### encodeBigNum

```solidity
function encodeBigNum(struct Buffer.buffer buf, uint256 value) internal view
```

### encodeSignedBigNum

```solidity
function encodeSignedBigNum(struct Buffer.buffer buf, int256 input) internal view
```

### encodeString

```solidity
function encodeString(struct Buffer.buffer buf, string value) internal view
```

### startArray

```solidity
function startArray(struct Buffer.buffer buf) internal view
```

### startMap

```solidity
function startMap(struct Buffer.buffer buf) internal view
```

### endSequence

```solidity
function endSequence(struct Buffer.buffer buf) internal view
```

