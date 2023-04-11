const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let vrfCoordinatorAddr
    let subId
    let keyHash

    if (chainId == 31337) {
        const vrfCoordinator = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorAddr = vrfCoordinator.address
        const tx = await vrfCoordinator.createSubscription()
        const txReceipt = await tx.wait(1)
        subId = ethers.BigNumber.from(txReceipt.events[0].topics[1])
        keyHash =
            "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc"
        await vrfCoordinator.fundSubscription(subId, "100000000000000000")
    } else {
        vrfCoordinatorAddr = networkConfig[chainId]["vrfCoordinatorAddr"]
        subId = networkConfig[chainId]["subId"]
        keyHash = networkConfig[chainId]["keyHash"]
    }

    log("----------------------------------------------------")
    log("部署 VRFTask 并等待确认...")
    const VRFTask = await deploy("VRFTask", {
        from: deployer,
        args: [subId, vrfCoordinatorAddr, keyHash],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`VRFTask deployed at ${VRFTask.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(VRFTask.address, [subId, vrfCoordinatorAddr, keyHash])
    }
}

module.exports.tags = ["all", "vrftask"]
