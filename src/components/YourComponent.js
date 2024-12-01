const handleTransaction = async () => {
    const contract = getContract();
    const accounts = await getWeb3().eth.getAccounts();
    
    // Set gas limit manually
    const gasLimit = 300000; // Adjust this value based on your contract function
    
    const result = await contract.methods.yourFunction()
        .send({
            from: accounts[0],
            gas: gasLimit,
            gasPrice: await getWeb3().eth.getGasPrice()
        });
    
    return result;
};
