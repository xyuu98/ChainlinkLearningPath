const { network } = require("hardhat")
const {
    LINK_INITIAL_ANSWER,
    ETH_INITIAL_ANSWER,
    BTC_INITIAL_ANSWER,
    DECIMALS,
    baseFee,
    gasPriceLink,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("检测到本地网络！部署模拟···")
        await deploy("MockV3Aggregator-Link", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, LINK_INITIAL_ANSWER],
        })
        await deploy("MockV3Aggregator-ETH", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, ETH_INITIAL_ANSWER],
        })
        await deploy("MockV3Aggregator-BTC", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, BTC_INITIAL_ANSWER],
        })
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [baseFee, gasPriceLink],
        })
        log("模拟部署！")
        log("----------------------------------------------")
        log("您正在部署到本地网络，您需要运行本地网络才能进行交互.")
        log("请运行 `npx hardhat console` 与部署的智能合约进行交互！")
        log("------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
