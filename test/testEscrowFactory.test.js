const EscrowFactory = artifacts.require("EscrowFactory");

contract("EscrowFactory", async (accounts) => {
    let escrowFactory;

    beforeEach(async () => {
        escrowFactory = await EscrowFactory.deployed();
    });

    it("Deploys the EscrowFactory", () => {
        assert.ok(escrowFactory.address);
    });

    it("Can create and Get Escrow Contracts", async () => {
        // buyer: accounts[0] (default account/msg sender) escrowAccount: accounts[1], seller: accounts[2]
        await escrowFactory.createEscrow(accounts[1], accounts[2], { from: accounts[0] });
        const deployedEscrowContract = await escrowFactory.getDeployedEscrowContract(0);
        assert.ok(deployedEscrowContract);
        await escrowFactory.createEscrow(accounts[1], accounts[2], { from: accounts[0] });
        const deployedEscrowContracts = await escrowFactory.getDeployedEscrowContracts();
        assert.lengthOf(deployedEscrowContracts, 2);
    });
});