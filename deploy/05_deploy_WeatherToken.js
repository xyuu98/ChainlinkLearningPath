const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("请使用其他链部署 WeatherToken ···")
    } else {
        log("----------------------------------------------------")
        log("部署 WeatherToken 并等待确认...")
        WeatherToken = await deploy("WeatherToken", {
            from: deployer,
            args: [],
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        })
        log(`WeatherToken deployed at ${WeatherToken.address}`)
    }

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(WeatherToken.address, [])
    }
}

module.exports.tags = ["all", "weathertoken"]
