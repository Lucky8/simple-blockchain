//import sha256 libraries
const SHA256 = require('crypto-js/sha256');


class Block{
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        this.hash = this.calculateHash(); //get hash from calculateHash()
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {

    //initialize blockchian
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    //add data to the first block
    createGenesisBlock(){
        return new Block(0, "24/08/2021", "i am the first block of the chain", "0");
    }

    //checks for newest Block
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    //adds a new block to the chain
    addBlock(newBlock){

        //check for existing block and get hash
        newBlock.previousHash = this.getLatestBlock().hash;
        
        //get the new block
        newBlock.hash = newBlock.calculateHash();

        //add new block to the chain/array
        this.chain.push(newBlock);
    }

    //check if chain is valid
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            //test to see if hash is still valid
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            //test if previous block is valid
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;

            }

            return true; //if validation passes
        }
    }
}

//test blockchain
let memeCoin = new Blockchain();
memeCoin.addBlock(new Block(1, "24/08/2021", {amount: 100 })); //add values to 2nd block
memeCoin.addBlock(new Block(2, "24/08/2021", {amount: 200})); //add values to 3rd block

console.log("is chain valid? " + memeCoin.isChainValid());
console.log(JSON.stringify(memeCoin, null, 4)); // RUN>> $ node main.js