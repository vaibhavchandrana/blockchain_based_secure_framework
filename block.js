const {Genesis_data}=require('./genesis'); // import genesis block from genisis.js

const cryptohash = require('./hashing');  // import cryptoHash function for hash 

class block{
    constructor({ timestamp,prevHash,hash,data,blockVersion })
    {
        this.blockVersion=blockVersion;
        this.timestamp=timestamp;
        this.prevHash=prevHash;
        this.hash=hash;
        this.data=data; 
    }

    static genesis()   
    {
        return new this(Genesis_data);
    }

    static mathmaticalPuzzle()
    {
        
    }


   static newBlock({prevBlock,data}) // pasing object of class block 
   {
    
    const blockVersion=prevBlock.blockVersion+1;
    const timestamp=Date.now();
    const prevHash=prevBlock.hash;
    const hash=cryptohash(blockVersion,timestamp,prevHash,data);
    return new this({
        blockVersion,
        timestamp,
        prevHash,
        data,
        hash

    });

   }
}

const genesisBlock=block.genesis();
console.log(genesisBlock)

const result=block.newBlock({prevBlock:genesisBlock,data:"block2"});
console.log(result)
const result2=block.newBlock({prevBlock:result,data:"Block no 3"});
 console.log(result2)

module.exports=block;
