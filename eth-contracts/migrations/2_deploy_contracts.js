// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const proofs = require('../../zokrates/code/square/proofs.json')

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SquareVerifier)
    .then(instance => {
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address)
        .then(instance => {
          // mint tokens
          Array.from(proofs).forEach((proof, index) => {
            instance.mintNewNft(
              accounts[0],
              index,
              proof.a,
              proof.b,
              proof.c,
              proof.inputs
            )
          })
        })
    })
}
