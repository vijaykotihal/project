import Web3 from 'web3';

export const contractAddress = "0xe3613aCBBB13465FCE5A7399d32E6B650b4dC645";

export const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "passreqid",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "date",
                "type": "string"
            }
        ],
        "name": "ApprovePassengerRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // ... rest of your ABI ...
];

// Initialize Web3 instance
export const web3 = new Web3(Web3.givenProvider || 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY');

// Initialize contract instance
export const contract = new web3.eth.Contract(contractABI, contractAddress);
