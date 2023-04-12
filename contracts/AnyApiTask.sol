// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

/*
 * 任务 4 内容，发送一个 Chainlink request，从外部获取一个数据
 *
 * 参考视频教程：https://www.bilibili.com/video/BV1ed4y1N7Uv?p=13
 *
 * 任务 4 完成标志：
 * 1. 通过命令 "yarn hardhat test" 使得单元测试 11-12 通过
 * 2. 通过 Remix 在 goerli 测试网部署，并且测试执行是否如预期
 */
contract AnyApiTask is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public volume;
    address private immutable oracle;
    bytes32 private immutable jobId;
    uint256 private immutable fee;

    event DataFulfilled(uint256 volume);

    constructor(
        address _oracle,
        /*bytes32 _jobId,*/ uint256 _fee,
        address _link
    ) {
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
        oracle = _oracle;
        jobId = "4ab16a5e777d4efba35b27f6c0b0087c";
        fee = _fee;
    }

    /*
     * 步骤 1 - 构建一个 Chainlink request
     * 通过 requestVolume 函数，给 Chainlink 发送获取外部数据请求
     */
    function requestVolume() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        request.add(
            "get",
            "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD"
        );
        request.add("path", "RAW,ETH,USD,VOLUME24HOUR");

        int256 timesAmount = 10 ** 18;
        request.addInt("times", timesAmount);

        return sendChainlinkRequest(request, fee);
        //构建 Chainlink request
        /**
         * 在这里添加代码，在本地网络中可以使用非真实的 API 以及相关信息
         * 如果在测试网中，需要使用真实 url 和 path，
         * 可以参考此处代码：https://docs.chain.link/any-api/get-request/examples/single-word-response
         * **/
    }

    /*
     * 步骤 2 - 接受 Chainlink 返回的数据
     * 通过 fulfill 函数，从外部 API 获得一个数据
     */
    function fulfill(
        bytes32 _requestId,
        uint256 _volume
    ) public recordChainlinkFulfillment(_requestId) {
        /**
         * 在这里添加代码，在本地网络中可以使用任意一个 API
         * 奖 _volume 存储在 volume 中
         * 可以参考此处代码：https://docs.chain.link/any-api/get-request/examples/single-word-response
         * **/
        emit DataFulfilled(volume);
        volume = _volume;
    }

    function withdrawLink() external {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}

// AnyApiTask deployed at 0x985Bf66598e9C3875B245b1d67d024e0D2cE2db3
// https://goerli.etherscan.io/address/0x985Bf66598e9C3875B245b1d67d024e0D2cE2db3#code
