1.
valley
2.
dog
3.
fashion
4.
list
5.
domain
6.
ripple
7.
nasty
8.
flag
9.
december
10.
pact
11.
funny
12.
swallow

// metamask phrase
valley dog fashion list domain ripple nasty flag december pact funny swallow

// chansteck api keys
gidf39cJ.fk0j8zST307RosA6EWcH3CmpTJQC5pf7

//metamask wallet address acc 1
0xf72f0D23350b5f5CD7eC9e2094751a59ae56d0ED
//metamask wallet address acc 2
0x2C039ff51a54aB1bE00337635A1A15e8b676224c



//sepoela ts code

import { createPublicClient, http, Block } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/0kq4LmJX83HlQs1IIssz5xfOh20vu1Pa"),
});

const block: Block = await client.getBlock({
  blockNumber: 123456n,
});

console.log(block);

//network url for sepolia
https://eth-sepolia.g.alchemy.com/v2/0kq4LmJX83HlQs1IIssz5xfOh20vu1Pa


//private key for metamask account 2
68201b8b4314ed8636ca538bc69effad32ba32f6c4edc3ece130f46bf9fa6e66
  //private key for metamask account 1
89f7a9104bcf6f3745971884ebbbeae431f5714391168fa9444ddc32b9cc3766