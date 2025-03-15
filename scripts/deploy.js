const hre = require("hardhat");

// Main function to deploy the contract
const main = async () => {
  try {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.deployed();
    console.log("Transactions deployed to:", transactions.address);
  } catch (error) {
    console.error("Error in deployment:");
    console.error(
      error instanceof Error ? `${error.message}\n${error.stack}` : error
    );
    throw error;
  }
};

// Function to run the main deployment function and handle exit
const runMain = async () => {
  try {
    await main();
    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error("Fatal error in deployment");
    console.error(
      error instanceof Error ? `${error.message}\n${error.stack}` : error
    );
    process.exit(1); // Exit the process with an error code
  }
};

runMain();
