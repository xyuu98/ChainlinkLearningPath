const networkConfig = {
    5: {
        name: "goerli",
        linkUsdPriceFeed: "0x48731cF7e84dc94C5f84577882c14Be11a5B7456",
        btcUsdPriceFeed: "0xA39434A63A52E749F02807ae27335515BA4b07F7",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",

        vrfCoordinatorAddr: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
        keyHash:
            "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subId: "5338",
    },
    31337: {
        name: "localhost",
    },
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = "18"
const LINK_INITIAL_ANSWER = "100000000000000000000"
const ETH_INITIAL_ANSWER = "200000000000000000000"
const BTC_INITIAL_ANSWER = "300000000000000000000"
const baseFee = "100000000000000000"
const gasPriceLink = "100000000"

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    LINK_INITIAL_ANSWER,
    ETH_INITIAL_ANSWER,
    BTC_INITIAL_ANSWER,
    baseFee,
    gasPriceLink,
}
