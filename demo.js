const cryptohash=require('./hashing')

const target="000129940c831070fa5cf5b53e12abe43f32b17bc06d8c40025a154e0ea61f53";
do{
    var nonce=Math.random()*100000000;
    var guess=cryptohash(Date().now,"first block",nonce);
    console.log("searching .....");
}while(guess>target);
console.log("answer found ");
console.log(guess);
