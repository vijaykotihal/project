import Web3 from 'web3';
import { contractAddress, contractABI } from '../contracts/config';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const getContract = () => {
    return contract;
};

export const getWeb3 = () => {
    return web3;
};
