const networkConfig = {
    5: {
        name: "goerli",
        linkUsdPriceFeed: "0x48731cF7e84dc94C5f84577882c14Be11a5B7456",
        btcUsdPriceFeed: "0xA39434A63A52E749F02807ae27335515BA4b07F7",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    31337: {
        name: "localhost",
    },
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER }
