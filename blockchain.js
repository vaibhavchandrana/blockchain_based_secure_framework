const Block = require('./block');
const cryptohash = require('./hashing');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];  // array of blocks

    }
    addBlock({ data, chain }) {
        const new_block = Block.newBlock({
            prevBlock: this.chain[this.chain.length - 1], // curent length-1 for prev block
            data: data
        });


        var favour = 0;
        var non_favour = 0;
        for (let i = 0; i < 100; i++) {
            let flag = Blockchain.consensus(new_block, chain);
            if (flag == 1) {
                favour++;
            }
            else {
                non_favour++;
            }
        }
        if (favour >= 75) {
            this.chain.push(new_block);
            console.log("Successfully added");
        }
        else {
            console.log("consesus denied the addition");
        }
    }

    static consensus(new_block, chain) {
        // checking if block allready exist or not

        if (new_block.data == "") {
            console.log("emoty data");
            return 0;
        }

        for (let i = 1; i < chain.length; i++) {
            if (chain[i].hash == new_block.hash) {
                console.log("repeated block");
                return 0;
            }
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, prevHash, hash, data } = chain[i];
            const realLastHash = chain[i - 1].hash;

            if (prevHash !== realLastHash) {
                console.log("hash ");
                return 0;
            }

            const newHash = cryptohash(timestamp, prevHash, data);
            if (hash != newHash) {
                console.log("hash");
                return 0;
            }


        }
        return 1;
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "first block", chain: blockchain });
blockchain.addBlock({ data: "second block", chain: blockchain });
blockchain.addBlock({data:"third block",chain:blockchain});
console.log(blockchain);


module.exports = Blockchain;