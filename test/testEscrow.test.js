const EscrowFactory = artifacts.require('EscrowFactory')
const Escrow = artifacts.require('Escrow')

contract('Escrow', async (accounts) => {
  let escrowFactory
  let escrow

  beforeEach(async () => {
    escrowFactory = await EscrowFactory.deployed()
    // buyer: accounts[0], escrow: accounts[1], seller: accounts[2]
    await escrowFactory.createEscrow(accounts[1], accounts[2], { from: accounts[0] })
    const escrowAddress = await escrowFactory.getDeployedEscrowContract(0)
    escrow = await Escrow.at(escrowAddress)
  })

  it('Deploys an Escrow', () => {
    assert.ok(escrow.address)
  })
})
