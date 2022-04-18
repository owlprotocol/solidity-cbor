---
sidebar_position: 1
slug: '/'
---

# Welcome

<!-- [![NPM Package Version][npm-image-version]][npm-url] -->
<!-- [![NPM Package Downloads][npm-image-downloads]][npm-url] -->
<!-- ![web3-redux-1024x256.svg](/img/web3-redux-1024x256.svg) -->

A Solidity library designed to allow for decoding complex data structures in Solidity. Think "JSON Parser" but leveraging the Compact Binary Object Representation (CBOR) for more efficiency.

This library allows for decoding and parsing of CBOR-encoded data.

CBOR is self-describing, meaning that any CBOR-encoded data passed in can be parsed. There's an
additional helper contract `ByteParser` that performs type casting on decoded CBOR values so they
can be used within your application logic.

## How do I encode data into CBOR?

Lucky for you, there's already librarys dedicated to this! Have a look at
[this page](https://cbor.io/impls.html) for a quick overview.

For example, with NodeJS:

```javascript
> const cbor = require('cbor');
> const myData = {a: '1', b: '2', c: [3,4,5]};
> cbor.encode(myData).toString('hex');
// Your CBOR-encoded data:
'a36161613161626132616383030405'
```
## What's it for?

Suppose you have some player data you want to use for an in-game NFT:

```json
{
    name: "Alice",
    wallet: "0x00000000000000000000000000000001",
    score: 10,
    alive: true
}
```

To keep players honest and unable to forge high scores, we'll use a hash of the data entry
to verify it's authoritative (i.e. with a MerkleTree, like how [Uniswap performs airdrops](https://github.com/Uniswap/merkle-distributor)).

Once the entire record has been verified as authoritative, it's possible to parse out specific fields:

```C++
/**
 * Assert record.wallet === msg.sender:
 */

// Extract the `wallet` field from CBOR
bytes memory walletBytes = CBORDecoding.decodeMappingGetValue(proof, "wallet");
// Type cast the bytes to an address
address walletAddress = ByteParser.parseAddr(walletBytes);
// Verify the caller is the record owner
require(msg.sender == walletAddress);

/**
 * Assert record.score > highScore:
 */

// Extract the `score` field from CBOR
bytes memory scoreBytes = CBORDecoding.decodeMappingGetValue(proof, "score");
// Type cast the bytes to a uint256
uint256 score = ByteParser.bytesToBigNumber(scoreBytes);
// Verify the score submitted is higher
require(score > HIGH_SCORE);
```

See [this contract](https://github.com/owlprotocol/react-snake-game/blob/develop/solidity/contracts/SnakeGameRewards.sol) for a real contract example.

[repo]: https://github.com/owlprotocol/solidity-cbor
[gh-page]: https://owlprotocol.github.io/solidity-cbor/
<!-- [npm-image-version]: https://img.shields.io/npm/v/@owlprotocol/web3-redux.svg -->
<!-- [npm-image-downloads]: https://img.shields.io/npm/dm/@owlprotocol/web3-redux.svg -->
<!-- [npm-url]: https://npmjs.org/package/@owlprotocol/web3-redux -->
