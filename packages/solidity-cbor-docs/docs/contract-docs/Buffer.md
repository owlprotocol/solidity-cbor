

## Buffer

_A library for working with mutable byte buffers in Solidity.

Byte buffers are mutable and expandable, and provide a variety of primitives
for writing to them. At any time you can fetch a bytes object containing the
current contents of the buffer. The bytes object should not be stored between
operations, as it may change due to resizing of the buffer._

### buffer

```solidity
struct buffer {
  bytes buf;
  uint256 capacity;
}
```

### init

```solidity
function init(struct Buffer.buffer buf, uint256 capacity) internal pure returns (struct Buffer.buffer)
```

_Initializes a buffer with an initial capacity._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to initialize. |
| capacity | uint256 | The number of bytes of space to allocate the buffer. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The buffer, for chaining. |

### fromBytes

```solidity
function fromBytes(bytes b) internal pure returns (struct Buffer.buffer)
```

_Initializes a new buffer from an existing bytes object.
     Changes to the buffer may mutate the original value._

| Name | Type | Description |
| ---- | ---- | ----------- |
| b | bytes | The bytes object to initialize the buffer with. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | A new buffer. |

### resize

```solidity
function resize(struct Buffer.buffer buf, uint256 capacity) private pure
```

### max

```solidity
function max(uint256 a, uint256 b) private pure returns (uint256)
```

### truncate

```solidity
function truncate(struct Buffer.buffer buf) internal pure returns (struct Buffer.buffer)
```

_Sets buffer length to 0._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to truncate. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining.. |

### write

```solidity
function write(struct Buffer.buffer buf, uint256 off, bytes data, uint256 len) internal pure returns (struct Buffer.buffer)
```

_Writes a byte string to a buffer. Resizes if doing so would exceed
     the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| off | uint256 | The start offset to write to. |
| data | bytes | The data to append. |
| len | uint256 | The number of bytes to copy. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### append

```solidity
function append(struct Buffer.buffer buf, bytes data, uint256 len) internal pure returns (struct Buffer.buffer)
```

_Appends a byte string to a buffer. Resizes if doing so would exceed
     the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| data | bytes | The data to append. |
| len | uint256 | The number of bytes to copy. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### append

```solidity
function append(struct Buffer.buffer buf, bytes data) internal pure returns (struct Buffer.buffer)
```

_Appends a byte string to a buffer. Resizes if doing so would exceed
     the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| data | bytes | The data to append. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### writeUint8

```solidity
function writeUint8(struct Buffer.buffer buf, uint256 off, uint8 data) internal pure returns (struct Buffer.buffer)
```

_Writes a byte to the buffer. Resizes if doing so would exceed the
     capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| off | uint256 | The offset to write the byte at. |
| data | uint8 | The data to append. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### appendUint8

```solidity
function appendUint8(struct Buffer.buffer buf, uint8 data) internal pure returns (struct Buffer.buffer)
```

_Appends a byte to the buffer. Resizes if doing so would exceed the
     capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| data | uint8 | The data to append. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### write

```solidity
function write(struct Buffer.buffer buf, uint256 off, bytes32 data, uint256 len) private pure returns (struct Buffer.buffer)
```

_Writes up to 32 bytes to the buffer. Resizes if doing so would
     exceed the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| off | uint256 | The offset to write at. |
| data | bytes32 | The data to append. |
| len | uint256 | The number of bytes to write (left-aligned). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### writeBytes20

```solidity
function writeBytes20(struct Buffer.buffer buf, uint256 off, bytes20 data) internal pure returns (struct Buffer.buffer)
```

_Writes a bytes20 to the buffer. Resizes if doing so would exceed the
     capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| off | uint256 | The offset to write at. |
| data | bytes20 | The data to append. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### appendBytes20

```solidity
function appendBytes20(struct Buffer.buffer buf, bytes20 data) internal pure returns (struct Buffer.buffer)
```

_Appends a bytes20 to the buffer. Resizes if doing so would exceed
     the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| data | bytes20 | The data to append. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chhaining. |

### appendBytes32

```solidity
function appendBytes32(struct Buffer.buffer buf, bytes32 data) internal pure returns (struct Buffer.buffer)
```

_Appends a bytes32 to the buffer. Resizes if doing so would exceed
     the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| data | bytes32 | The data to append. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### writeInt

```solidity
function writeInt(struct Buffer.buffer buf, uint256 off, uint256 data, uint256 len) private pure returns (struct Buffer.buffer)
```

_Writes an integer to the buffer. Resizes if doing so would exceed
     the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| off | uint256 | The offset to write at. |
| data | uint256 | The data to append. |
| len | uint256 | The number of bytes to write (right-aligned). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer, for chaining. |

### appendInt

```solidity
function appendInt(struct Buffer.buffer buf, uint256 data, uint256 len) internal pure returns (struct Buffer.buffer)
```

_Appends a byte to the end of the buffer. Resizes if doing so would
exceed the capacity of the buffer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| buf | struct Buffer.buffer | The buffer to append to. |
| data | uint256 | The data to append. |
| len | uint256 |  |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Buffer.buffer | The original buffer. |

