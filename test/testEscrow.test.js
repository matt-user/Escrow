const EscrowFactory = artifacts.require('EscrowFactory')
const Escrow = artifacts.require('Escrow')

contract('Escrow', async (accounts) => {
  let escrowFactory;
  let escrow;
  let escrowAddress;

  beforeEach(async () => {
    escrowFactory = await EscrowFactory.deployed()
    // buyer: accounts[0], escrow: accounts[1], seller: accounts[2]
    await escrowFactory.createEscrow(accounts[1], accounts[2], { from: accounts[0], value: web3.utils.toWei("2", 'ether') });
    escrowAddress = await escrowFactory.getDeployedEscrowContract(0)
    escrow = await Escrow.at(escrowAddress)
  })

  it('Deploys an Escrow and sends funds', async () => {
    assert.ok(escrow.address, "Escrow contract did not deploy");
    const balance = await web3.eth.getBalance(escrowAddress);
    assert.strictEqual(web3.utils.fromWei(balance, 'ether'), '2', "Escrow contract did not receive funds");
  })

  it('Buyer can release funds', async () => {
    releaseFundsHelper(escrow, accounts[0], accounts[2])
  });

  it('Escrow contract can release funds', async () => {
    releaseFundsHelper(escrow, accounts[1], accounts[2]);
  });

  it('Seller can not release funds', async () => {
    try {
      await escrow.releaseFunds({ from: accounts[2] });
      assert(false, "Seller should not be able to release funds");
    } catch (err) {
      assert(err);
    }
  });

  it('Seller can refund funds', async () => {
    refundFundshelper(escrow, accounts[2], accounts[0]);
  });

  it('Escrow contract can refund funds', async () => {
    refundFundshelper(escrow, accounts[1], accounts[0]);
  });
});


/**
 * Summary.
 * account releases funds from the escrow account to the seller account
 * Requires account to be either the buyer or escrowAccount
 * @param {Object} escrow escrow contract 
 * @param {address} account address that releases the funds in the escrow account 
 * @param {address} sellerAccount address that receives the funds in the escrow account 
 */
async function releaseFundsHelper(escrow, account, sellerAccount) {
  await escrow.releaseFunds({ from: account });
  const etherBalance = web3.utils.fromWei(await web3.eth.getBalance(sellerAccount), 'ether');
  assert.strictEqual(etherBalance, "102", "Seller account did not receive ether");
}

/**
 * Summary.
 * account refunds funds from the escrow account back to the buyer account
 * require the account to be either seller or escrowAccoutn
 * @param {Object} escrow escrow contract 
 * @param {address} account address that refunds the fudns in the escrow account
 * @param {address} buyerAccount address that receives the funds in the escrow account
 */
async function refundFundshelper(escrow, account, buyerAccount) {
  await escrow.refundFunds({ from: account });
  const etherBalance = parseFloat(web3.utils.fromWei(await web3.eth.getBalance(buyerAccount), 'ether'));
  assert.isTrue(etherBalance <= 102, "Buyer account did not receive ether");
}
