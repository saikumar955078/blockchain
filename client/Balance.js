import { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function Balance({ contract, balance, setBalance }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBalance = async () => {
    try {
      if (!contract) return;
      setLoading(true);
      const weiBalance = await contract.methods.getBalance().call();
      setBalance(Web3.utils.fromWei(weiBalance, 'ether'));
    } catch (err) {
      setError('Failed to fetch balance: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchBalance();
    }
  }, [contract, fetchBalance]);

  return (
    <div className="section-card">
      <h2>Contract Balance</h2>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading balance...</p>
        </div>
      ) : (
        <div className="balance-display">
          <p>Current Balance</p>
          <h3>{balance} <span>ETH</span></h3>
        </div>
      )}
      <button onClick={fetchBalance} disabled={!contract} className="action-button">
        Refresh Balance
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}