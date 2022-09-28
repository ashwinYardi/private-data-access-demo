import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Private Access Demo", function () {
  const publicValue = 1;
  const privateValue = 2;

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDemo() {
    const Demo = await ethers.getContractFactory("PrivateAccessDemo");
    const demo = await Demo.deploy(privateValue, publicValue);
    await demo.deployed();
    return demo;
  }

  it("Should read the private variable from the slot correctly", async function () {
    const demo = await loadFixture(deployDemo);
    const slot0Bytes = await ethers.provider.getStorageAt(demo.address, 0);
    const slot1Bytes = await ethers.provider.getStorageAt(demo.address, 1);

    const slot0Data = ethers.BigNumber.from(slot0Bytes);
    const slot1Data = ethers.BigNumber.from(slot1Bytes);

    expect(slot0Data).to.be.equals(ethers.BigNumber.from(privateValue));
    expect(slot1Data).to.be.equals(ethers.BigNumber.from(publicValue));
  });
});
