const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const intervel = 3600
    let AutomationTask

    if (chainId == 31337) {
        log("请使用其他链部署 AutomationTask ···")
    } else {
        log("----------------------------------------------------")
        log("部署 AutomationTask 并等待确认...")
        AutomationTask = await deploy("AutomationTask", {
            from: deployer,
            args: [intervel],
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        })
        log(`AutomationTask deployed at ${AutomationTask.address}`)
    }

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(AutomationTask.address, [intervel])
    }
}

module.exports.tags = ["all", "automationtask"]
