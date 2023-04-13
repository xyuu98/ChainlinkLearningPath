const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("请使用其他链部署 APIConsumer ···")
    } else {
        log("----------------------------------------------------")
        log("部署 APIConsumer 并等待确认...")
        APIConsumer = await deploy("APIConsumer", {
            from: deployer,
            args: ["0x740daca9f5744aa1fBd4634c95fcD2b8e7E68Bd0"],
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        })
        log(`APIConsumer deployed at ${APIConsumer.address}`)
    }

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(APIConsumer.address, [
            "0x740daca9f5744aa1fBd4634c95fcD2b8e7E68Bd0",
        ])
    }
}

module.exports.tags = ["all", "apiconsumer"]
