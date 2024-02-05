import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("GoMiners", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const [deployer] = await ethers.getSigners();

    console.log("deployer.address", deployer.address);

    const GoMiners = await ethers.getContractFactory("GoMiners", deployer);
    const goMiners = await upgrades.deployProxy(
      GoMiners,
      [
        deployer.address,
        deployer.address,
        deployer.address,
        deployer.address,
        deployer.address,
        deployer.address,
        "500",
      ],
      {
        initializer: "initialize",
        kind: "uups",
      }
    );
    await goMiners.waitForDeployment();
    console.log("GoMiners deployed to:", await goMiners.getAddress());

    return { goMiners, deployer };
  }

  describe("Deployment", function () {
    describe("Deployment", function () {
      it("Deployment", async function () {
        const { goMiners } = await loadFixture(deployOneYearLockFixture);

        const result = await goMiners.royaltyInfo(0, 100000);
        console.log("result", result);
        expect(true).to.be.equal(true);
      });
    });

    describe("Mint", function () {
      it("Mint", async function () {
        const { goMiners, deployer } = await loadFixture(
          deployOneYearLockFixture
        );

        const result = await goMiners.safeMint(
          deployer.address,
          1000,
          "ipfs://test"
        );
        const tokenUrl = await goMiners.tokenURI(1000);

        console.log("result", result);
        console.log("tokenUrl", tokenUrl);
        expect(true).to.be.equal(true);
      });
    });
  });

  // it("works", async () => {
  //   const [deployer] = await ethers.getSigners();

  //   const GoMiners = await ethers.getContractFactory("GoMiners", deployer);

  //   const GoMinersV2 = await ethers.getContractFactory("GoMinersV2");

  //   const instance = await upgrades.deployProxy(
  //     GoMiners,
  //     [
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       "500",
  //     ],
  //     {
  //       initializer: "initialize",
  //       kind: "uups",
  //     }
  //   );
  //   const upgraded = await upgrades.upgradeProxy(
  //     await instance.getAddress(),
  //     GoMinersV2
  //   );

  //   await upgraded.setName("bla");

  //   const value = await upgraded.getName();

  //   console.log("value", value);
  //   // expect(value.toString()).to.be();
  // });
});
