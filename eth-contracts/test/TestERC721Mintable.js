var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            this.contract.mint(account_two, 1, { from: account_one });
            this.contract.mint(account_three, 2, { from: account_one });
        })

        it('should return total supply', async function () {
            const total = await this.contract.totalSupply({ from: account_one });
            assert.equal(total.toNumber(), 2, "Total supply not matched");
        })

        it('should get token balance', async function () { 
            const tokenBalance = await this.contract.balanceOf(account_two);
            assert.equal(tokenBalance.toNumber(), 1, "Token balance not matched");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            const tokenUri = await this.contract.tokenURI.call(1, {from: account_one});
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "TokenURI is invalid");
        })

        it('should transfer token from one owner to another', async function () {
            try {
                await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            } catch (error) {
                console.log(error.toString());
            }
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let flag = false;
            try {
                await this.contract.mint(account_three, 1, { from: account_three });
            } catch (error) {
                flag = true;
            }
            assert.equal(flag, true, "Address is not contract owner");
        })

        it('should return contract owner', async function () { 
            const owner = await this.contract.getContractOwner.call({from: account_one});
            assert.equal(owner, account_one, "Not contract owner");
        })
    });
})