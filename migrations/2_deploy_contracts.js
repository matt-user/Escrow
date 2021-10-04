const EscrowFactory = artifacts.require("EscrowFactory");

module.exports = (deployer, network, accounts) => {
  const superUser = accounts[0];
  console.log(`Deploying to network: ${network} from: ${superUser}`);
  deployer.deploy(EscrowFactory, { from: superUser }, () => {
    console.log(`Deployed EscrowFactory to address: ${EscrowFactory.address}`);
  });
};
