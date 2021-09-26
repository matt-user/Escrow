const EscrowFactory = artifacts.require('EscrowFactory')

module.exports = (deployer) => {
  deployer.deploy(EscrowFactory)
}
