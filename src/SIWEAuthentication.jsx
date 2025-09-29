import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

const SIWEAuthentication = () => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Connect to wallet
    const connectWallet = async () => {
        if (!window.ethereum) {
            setError('MetaMask or another web3 wallet is required');
            return;
        }

        setLoading(true);
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            setAddress(accounts[0]);
            setError('');
        } catch (err) {
            setError('Failed to connect wallet: ' + err.message);
        }
        setLoading(false);
    };

    // Sign in with Ethereum
    const signInWithEthereum = async () => {
        if (!address) {
            setError('Please connect your wallet first');
            return;
        }

        setLoading(true);
        try {
            // Create provider and signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get nonce from backend
            const nonceResponse = await fetch('/api/auth/nonce');
            const nonce = await nonceResponse.text();

            // Get chain ID
            const chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });

            // Create SIWE message
            const domain = window.location.host;
            const origin = window.location.origin;
            const statement = 'Sign in with Ethereum to authenticate with our application.';

            const message = new SiweMessage({
                domain,
                address,
                statement,
                uri: origin,
                version: '1',
                chainId: parseInt(chainId, 16),
                nonce: nonce
            });

            const messageToSign = message.prepareMessage();

            // Sign the message
            const signature = await signer.signMessage(messageToSign);

            // Verify with backend
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message.prepareMessage(),
                    signature
                }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('authToken', data.token);
                setIsAuthenticated(true);
                setError('');
            } else {
                setError('Authentication failed');
            }
        } catch (err) {
            setError('Sign-in failed: ' + err.message);
        }
        setLoading(false);
    };

    // Sign out
    const signOut = async () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setAddress('');
    };

    return (
        <div className="siwe-container">
            <h2>Sign-in with Ethereum</h2>

            {error && <div className="error">{error}</div>}

            {!isAuthenticated ? (
                <div>
                    {!address ? (
                        <button onClick={connectWallet} disabled={loading}>
                            {loading ? 'Connecting...' : 'Connect Wallet'}
                        </button>
                    ) : (
                        <div>
                            <p>Connected: {address.substring(0, 6)}...{address.substring(address.length - 4)}</p>
                            <button onClick={signInWithEthereum} disabled={loading}>
                                {loading ? 'Signing...' : 'Sign-in with Ethereum'}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <p>✅ Authenticated as: {address}</p>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </div>
    );
};

export default SIWEAuthentication;
