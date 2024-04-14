const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("Deployment should assign the total pool allotment of coverage tokens.", async function () {
        const [owner] = await ethers.getSigners();
        const hardhatToken = await ethers.deployContract("TokenPoolA");
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});