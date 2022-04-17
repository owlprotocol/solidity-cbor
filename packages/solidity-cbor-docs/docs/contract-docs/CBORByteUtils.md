

## CBORByteUtils

_Helpful byte utility functions._

### sliceBytesMemory

```solidity
function sliceBytesMemory(bytes data, uint256 start, uint256 end) internal view returns (bytes slicedData)
```

_Slices a dynamic bytes object from start:end (non-inclusive end)_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes |  |
| start | uint256 | position to start byte slice (inclusive) |
| end | uint256 | position to end byte slice (non-inclusive) |

| Name | Type | Description |
| ---- | ---- | ----------- |
| slicedData | bytes | dynamic sliced bytes object |

### bytesToUint256

```solidity
function bytesToUint256(bytes data) internal view returns (uint256 value)
```

_Converts a dynamic bytes array to a uint256_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | dynamic bytes array |

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | uint256 | calculated uint256 value |

