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
    assert.ok(escrow.address);
    const balance = await web3.eth.getBalance(escrowAddress);
    assert.strictEqual(web3.utils.fromWei(balance, 'ether'), '2');
  })

  it('Send funds to contract', async () => {
    await escrow.releaseFunds({ from: accounts[0] });
    assert(accounts[0])
  }); 
})
