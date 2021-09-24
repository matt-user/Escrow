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
        await escrowFactory.createEscrow()
    });
});