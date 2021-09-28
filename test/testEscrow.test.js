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
    await escrow.releaseFunds({ from: accounts[0] });
    const etherBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[2]), 'ether');
    assert.strictEqual(etherBalance, "102", "Seller account did not receive ether");
  });

  it('Escrow contract can release funds', async () => {
    await escrow.releaseFunds({ from: accounts[1] });
    const etherBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[2]), 'ether');
    assert.strictEqual(etherBalance, "102", "Seller account did not receive ether");
  });

  it('Seller can not release funds', async () => {
    try {
      await escrow.releaseFunds({ from: accounts[2] });
      assert(false, "Seller should not be able to release funds");
    } catch (err) {
      assert(err);
    }
  });
})
