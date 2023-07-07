const { expect } = require("chai");

// Global constants for listing an item...
const ID = 1;
const NAME = "Bread";
const DOE = "30/03/2023";
const MDATE = "20/03/2023";
const COST = 50;

describe("Dappazon", () => {
  let dappazon;
  let deployer;

  beforeEach(async () => {
    // Setup accounts
    [deployer] = await ethers.getSigners();

    // Deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  });

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;

    beforeEach(async () => {
      // List a item
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, DOE, MDATE, COST);
      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await dappazon.items(ID);

      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.doe).to.equal(DOE);
      expect(item.mdate).to.equal(MDATE);
      expect(item.cost).to.equal(COST);
    });

    it("Emits List event", () => {
      expect(transaction).to.emit(dappazon, "List");
    });
  });
});
