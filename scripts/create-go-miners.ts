import { ethers, upgrades } from "hardhat";
import hre from "hardhat";

async function main() {
  console.log("hre", hre.network);

  let royaltyReceiver: undefined | string = undefined;

  if (hre.network.name === "goerli") {
    royaltyReceiver = process.env.GOERLI_ROYALTY_RECEIVER;
  } else if (hre.network.name === "mainnet") {
    royaltyReceiver = process.env.MAINNET_ROYALTY_RECEIVER;
  } else if (hre.network.name === "sepolia") {
    royaltyReceiver = process.env.SEPOLIA_ROYALTY_RECEIVER;
  } else {
    throw new Error("Unknown network");
  }

  console.log("royaltyReceiver", royaltyReceiver);

  if (!royaltyReceiver) {
    throw new Error("royaltyReceiver is undefined");
  }

  const [deployer] = await ethers.getSigners();

  const GoMiners = await ethers.getContractFactory("GoMiners", deployer);
  const goMiners = await upgrades.deployProxy(
    GoMiners,
    [
      deployer.address,
      deployer.address,
      deployer.address,
      deployer.address,
      deployer.address,
      royaltyReceiver,
      "500",
    ],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await goMiners.waitForDeployment();
  console.log("GoMiners deployed to:", await goMiners.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
