import { useState } from 'react';
import Web3 from 'web3';

export default function Withdraw({ contract, account }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        throw new Error('Please enter a valid positive amount');
      }
      const weiAmount = Web3.utils.toWei(amount, 'ether');
      const tx = await contract.methods.withdraw(weiAmount).send({ from: account });
      
      alert(`Successfully withdrew ${amount} ETH! Transaction Hash: ${tx.transactionHash}`);
      setAmount('');
      
    } catch (err) {
      setError('Withdrawal failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-card">
      <h2>Withdraw Ether</h2>
      <form onSubmit={handleWithdraw} className="form-container">
        <div className="form-group">
          <label htmlFor="amount">Amount to Withdraw</label>
          <div className="input-group">
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter ETH amount"
              step="0.0001"
            />
          </div>
        </div>
        <button type="submit" disabled={!contract || loading} className="action-button">
          {loading ? <><span className="loading"></span> Processing...</> : 'Withdraw Funds'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}