import React, { useState } from 'react';
import { executeTransaction } from '../services/contractService';
import { getWeb3 } from '../utils/web3Setup';
import { getContract } from '../utils/web3Config';
import '../styles/Mint.css';

const Mint = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState('');
    const [mintCount, setMintCount] = useState(1);

    const handleTransaction = async () => {
        const contract = getContract();
        const accounts = await getWeb3().eth.getAccounts();
        // Replace 'mint' with your actual contract function name
        const result = await executeTransaction(contract, contract.methods.mint(mintCount), accounts[0]);
        return result;
    };

    const mint = async () => {
        try {
            setIsLoading(true);
            setTransactionStatus('Starting mint process...');
            const result = await handleTransaction();
            setTransactionStatus('NFT minted successfully!');
            console.log("Transaction successful:", result);
        } catch (error) {
            setTransactionStatus('Minting failed. Please try again.');
            console.error("Transaction failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mint-container">
            <h2>Mint Your NFT</h2>
            <div className="mint-controls">
                <button 
                    onClick={mint} 
                    disabled={isLoading}
                    className="mint-button"
                >
                    {isLoading ? 'Minting...' : 'Mint NFT'}
                </button>
            </div>
            {transactionStatus && (
                <div className={`status-message ${transactionStatus.includes('failed') ? 'error' : 'success'}`}>
                    {transactionStatus}
                </div>
            )}
        </div>
    );
};

export default Mint;