import { useState } from 'react';
import vaultABI from './contractABI';

export default function ConnectContract({ web3, setContract }) {
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError('');
      
      const instance = new web3.eth.Contract(vaultABI, contractAddress);
      setContract(instance);
      
    } catch (err) {
      setError('Failed to connect to contract: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-card">
      <h2>Connect to Smart Contract</h2>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="contract-address">Contract Address</label>
          <input
            id="contract-address"
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter your contract address"
          />
        </div>
        <button onClick={handleConnect} disabled={!web3 || loading} className="action-button">
          {loading ? <><span className="loading"></span> Connecting...</> : 'Connect to Contract'}
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}