

## CBORTesting

_Documentation for contract._

### _state

```solidity
bool _state
```

### testDecodeCBORMapping

```solidity
function testDecodeCBORMapping(bytes encoding) public view returns (bytes[2][] decodedData)
```

CBOR Decoding utilities

### testDecodeCBORMappingGetValue

```solidity
function testDecodeCBORMappingGetValue(bytes encoding, bytes key) public view returns (bytes value)
```

### testDecodeCBORArrayGetIndex

```solidity
function testDecodeCBORArrayGetIndex(bytes encoding, bytes key) public view returns (uint64 index)
```

### testDecodeCBORArrayGetItem

```solidity
function testDecodeCBORArrayGetItem(bytes encoding, uint64 index) public view returns (bytes value)
```

### testDecodeCBORArray

```solidity
function testDecodeCBORArray(bytes encoding) public view returns (bytes[] decodedData)
```

### testDecodeCBORPrimitive

```solidity
function testDecodeCBORPrimitive(bytes encoding) public view returns (bytes decodedData)
```

### testBytesToNegativeInt128

```solidity
function testBytesToNegativeInt128(bytes encoding) public view returns (int128)
```

ByteParser utilities

### testBytesToUint64

```solidity
function testBytesToUint64(bytes encoding) public view returns (uint64)
```

### testBytesToString

```solidity
function testBytesToString(bytes encoding) public view returns (string)
```

### testBytesToBigNumber

```solidity
function testBytesToBigNumber(bytes encoding) public view returns (uint256 value)
```

### testBytesToBool

```solidity
function testBytesToBool(bytes encoding) public view returns (bool state)
```

### baselineStateChange

```solidity
function baselineStateChange() public
```

Benchmark how expensive decoding is (with state changes)
Call some state to measure how expensive our computations are

### statefulTestDecodeCBORMapping

```solidity
function statefulTestDecodeCBORMapping(bytes encoding) public
```

### statefulTestDecodeCBORMappingGetValue

```solidity
function statefulTestDecodeCBORMappingGetValue(bytes encoding, bytes key) public
```

### statefulTestDecodeCBORArrayGetIndex

```solidity
function statefulTestDecodeCBORArrayGetIndex(bytes encoding, bytes key) public
```

### statefulTestDecodeCBORArrayGetItem

```solidity
function statefulTestDecodeCBORArrayGetItem(bytes encoding, uint64 index) public
```

### statefulTestDecodeCBORArray

```solidity
function statefulTestDecodeCBORArray(bytes encoding) public
```

### statefulTestDecodeCBORPrimitive

```solidity
function statefulTestDecodeCBORPrimitive(bytes encoding) public
```

