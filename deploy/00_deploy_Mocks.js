const { network } = require("hardhat")
const { INITIAL_ANSWER, DECIMALS } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("检测到本地网络！部署模拟···")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("模拟部署！")
        log("----------------------------------------------")
        log("您正在部署到本地网络，您需要运行本地网络才能进行交互.")
        log("请运行 `npx hardhat console` 与部署的智能合约进行交互！")
        log("------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
