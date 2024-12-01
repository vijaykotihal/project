const checkNetwork = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkType = await web3.eth.net.getNetworkType();
    return { networkId, networkType };
};
