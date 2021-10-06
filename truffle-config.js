const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider")
require("dotenv").config();

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
      host: "127.0.0.1",
      port: "7545",
      network_id: "*"
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(process.env.SECRET, process.env.INFURA_API);
      },
      network_id: 1
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '>=0.7.0 <0.9.0'
    }
  }
}
