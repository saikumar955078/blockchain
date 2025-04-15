import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import ConnectContract from './ConnectContract';
import Withdraw from './Withdraw';
import Balance from './Balance';
import './App.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState('0');

  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        
        window.ethereum.on('accountsChanged', (newAccounts) => {
          setAccount(newAccounts[0] || '');
        });
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectMetaMask = () => {
    setAccount('');
    setWeb3(null);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/connect">Connect Contract</Link>
          <Link to="/withdraw">Withdraw</Link>
          <Link to="/balance">Balance</Link>
          <button onClick={account ? disconnectMetaMask : connectMetaMask}>
            {account ? 'Disconnect Wallet' : 'Connect Wallet'}
          </button>
          {account && <p>Connected Account: {account}</p>}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<ConnectContract web3={web3} setContract={setContract} />} />
          <Route path="/withdraw" element={<Withdraw contract={contract} account={account} />} />
          <Route path="/balance" element={<Balance contract={contract} balance={balance} setBalance={setBalance} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Decentralized Vault DApp</h1>
      <p className="hero-subtitle">Secure Asset Management Platform</p>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Secure Storage</h3>
          <p>Safely store your ETH in our audited smart contract vault</p>
        </div>
        <div className="feature-card">
          <h3>Instant Withdrawals</h3>
          <p>24/7 access to your funds through MetaMask integration</p>
        </div>
        <div className="feature-card">
          <h3>Advanced Security</h3>
          <p>Multi-layer protection with smart contract audits</p>
        </div>
      </div>
    </div>
  );
}

export default App;
