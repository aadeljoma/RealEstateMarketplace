// Allows us to use ES6 in our migrations and tests.
require("babel-register");
require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "dash inch blush nerve occur height marriage vast priority near cream parrot";

const infuraKey = "7029ffa74f644e4b9f43e9f893b4d09f";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,       // rinkeby's id
      gas: 4500000,        // rinkeby has a lower block limit than mainnet
      gasPrice: 10000000000
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  },

  compilers: {
    solc: {
      version: "0.5.2"
    }
  }
};
