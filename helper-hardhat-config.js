const networkConfig = {
    31337: {
        name: "localhost",
    },

    5: {
        name: "goerli",
        linkUsdPriceFeed: "0x48731cF7e84dc94C5f84577882c14Be11a5B7456",
        btcUsdPriceFeed: "0xA39434A63A52E749F02807ae27335515BA4b07F7",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        vrfCoordinatorAddr: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
        keyHash:
            "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subId: "5338",
        oracle: "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7",
        jobId: "4ab16a5e777d4efba35b27f6c0b0087c",
        fee: "100000000000000000",
        link: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },

    11155111: {
        name: "sepolia",
        vrfCoordinatorAddr: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
        keyHash:
            "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        subId: "1136",
        oracle: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD",
        jobId: "ca98366cc7314957b8c012c72f05aeeb",
        fee: "100000000000000000",
        link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
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
