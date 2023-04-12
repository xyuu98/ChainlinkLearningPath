const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { link } = require("ethereum-waffle")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let s_oracle = networkConfig[chainId]["oracle"]
    // let s_jobId = networkConfig[chainId]["jobId"]
    let s_fee = networkConfig[chainId]["fee"]
    let s_link = networkConfig[chainId]["link"]

    if (chainId == 31337) {
        log("请使用其他链部署 AnyApiTask ···")
    } else {
        log("----------------------------------------------------")
        log("部署 AnyApiTask 并等待确认...")
        AnyApiTask = await deploy("AnyApiTask", {
            from: deployer,
            args: [s_oracle, /*s_jobId,*/ s_fee, s_link],
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        })
        log(`AnyApiTask deployed at ${AnyApiTask.address}`)
    }

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(AnyApiTask.address, [s_oracle, /*s_jobId,*/ s_fee, s_link])
    }
}

module.exports.tags = ["all", "anyapitask"]
