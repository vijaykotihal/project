import Web3 from 'web3';
import { contractAddress, contractABI } from '../contracts/config';

const web3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/RIfactV-XLRUCXTTqKgW9BGFGURlWMyB');
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Check network connection
export const checkNetwork = async () => {
    const networkId = await web3.eth.net.getId();
    return networkId;
};

// Get contract instance
export const getContract = () => {
    return contract;
};

// Get web3 instance
export const getWeb3 = () => {
    return web3;
};

// Get account balance
export const getBalance = async (address) => {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
};

// Check if MetaMask is connected
export const isMetaMaskConnected = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts.length > 0;
};

export default web3;
