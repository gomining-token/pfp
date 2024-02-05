import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const {
  GOERLI_URL,
  GOERLI_PRIVATE_KEY,
  SEPOLIA_URL,
  SEPOLIA_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  MAINNET_URL,
  MAINNET_PRIVATE_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: GOERLI_URL,
      accounts: [`0x${GOERLI_PRIVATE_KEY!}`],
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY!}`],
    },
    mainnet: {
      url: MAINNET_URL,
      accounts: [`0x${MAINNET_PRIVATE_KEY!}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
