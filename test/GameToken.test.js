
/**
 * tests for 
 */

var GameToken = artifacts.require("./GameToken.sol");

require('chai')
.use(require('chai-as-promised'))
.should()


contract('Game Token', async (accounts) => {
    var instance;

    before(async () => {
        instance = await GameToken.deployed()
    })

    it('sets total supply of the token on deploy', async () => {
        console.log("we in here")
        
        var ts = await instance.totalSupply()

        console.log("mhm")
        console.log("Total supply: " + ts)

        var bo = await instance.balanceOf(accounts[0])

        console.log("balanceOf: " + bo)

        assert.equal(ts.toNumber(), 1000000, 'sets total supply to 1M')
        
        assert.equal(bo.toNumber(), 1000000, '1M are added to the owners wallet');
        
    })

    // change this to transfer from us to you

    it('transfers token ownership', async () => {
        try {
            await instance.transfer.call(accounts[1], 999999999999999);
            assert.fail()
        }
        catch (err) {
            console.log('failed');
            assert(err.message.indexOf('revert') >= 0, 'error message must contain revert')

            receipt = await instance.transfer.call(accounts[1], 25000, {from: accounts[0]})
            assert.equal(receipt, true);

            receipt = await instance.transfer(accounts[1], 250000, {from: accounts[0]})            
            assert.equal(receipt.logs.length, 1)
            assert.equal(receipt.logs[0].event, 'Transfer')
            assert.equal(receipt.logs[0].args._from, accounts[0]);
            assert.equal(receipt.logs[0].args._to, accounts[1]);
            assert.equal(receipt.logs[0].args._amount, 250000)
            
            assert.equal((await instance.balanceOf(accounts[1])).toNumber(), 250000)
            assert.equal((await instance.balanceOf(accounts[0])).toNumber(), 750000)

        }
        
        
        
    })
    

})

