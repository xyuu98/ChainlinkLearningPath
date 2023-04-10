const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let linkUsdPriceFeedAddress
    let btcUsdPriceFeedAddress
    let ethUsdPriceFeedAddress

    if (chainId == 31337) {
        const linkUsdAggregator = await deployments.get("MockV3Aggregator")
        const btcUsdAggregator = await deployments.get("MockV3Aggregator")
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        linkUsdPriceFeedAddress = linkUsdAggregator.address
        btcUsdPriceFeedAddress = btcUsdAggregator.address
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        linkUsdPriceFeedAddress = networkConfig[chainId]["linkUsdPriceFeed"]
        btcUsdPriceFeedAddress = networkConfig[chainId]["btcUsdPriceFeed"]
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("部署 DataFeedTask 并等待确认...")
    const DataFeedTask = await deploy("DataFeedTask", {
        from: deployer,
        args: [
            linkUsdPriceFeedAddress,
            btcUsdPriceFeedAddress,
            ethUsdPriceFeedAddress,
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`DataFeedTask deployed at ${DataFeedTask.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(DataFeedTask.address, [
            linkUsdPriceFeedAddress,
            btcUsdPriceFeedAddress,
            ethUsdPriceFeedAddress,
        ])
    }
}

module.exports.tags = ["all", "datafeedtask"]
