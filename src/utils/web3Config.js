import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

// Simplified gas estimation
const getGasEstimate = async () => {
    return 500000; // Fixed gas estimate
};

export { getGasEstimate, web3 };
