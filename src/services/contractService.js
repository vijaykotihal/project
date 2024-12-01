const executeTransaction = async (contract, method, account) => {
    return method.send({
        from: account,
        gas: 500000,  // Fixed optimal gas value
    });
};

export { executeTransaction };