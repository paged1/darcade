const PrizeToken = artifacts.require("PrizeToken");
const GameToken = artifacts.require("GameToken");

module.exports = function(deployer) {
    deployer.deploy(PrizeToken);
    deployer.deploy(GameToken, 1000000);
};
