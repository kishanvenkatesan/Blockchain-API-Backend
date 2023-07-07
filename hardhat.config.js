require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/ByJ6eoFJQRS4aJPw23784nk3MI6My0-Z",
      accounts: [
        `0x${"32396880e8e0f354015cfd6476c306e340a33c486b3afd7a785a7d64e811b215"}`,
      ],
    },
  },
};
