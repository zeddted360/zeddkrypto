require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

console.log("the private key is:", process.env.PRIVATE_KEY_TWO);

const config = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/0kq4LmJX83HlQs1IIssz5xfOh20vu1Pa",
      accounts: [process.env.PRIVATE_KEY_TWO],
    },
  },
};

module.exports = config;
