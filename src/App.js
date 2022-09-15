import { useState, useEffect } from "react";
import "./App.css";
import Login from "./View/Pages/Login/Login";
import Wellcome from "./View/Pages/Wellcome/Wellcome";
import Web3 from "web3";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(window.ethereum);
  const [chainId, setChainId] = useState(null);
  const [web3, setWeb3] = useState(null);
  // const [userBalance, setUserBalance] = useState(null);
  const [ethBalance, setEthBalance] = useState("");

  const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Main Network",
  };

  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    // const address = await web3.eth.getAddress();
    const account = accounts[0];
    // const ethBalance = await web3.eth.getBalance(account);
    // convert lại số dư trog ví
    const balanceInWei = await web3.eth.getBalance(account);
    const ethBalance = web3.utils.fromWei(balanceInWei, "ether");

    if (accounts.length === 0) {
      console.log("Error...");
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider);
      setWeb3(web3);
      setChainId(chainId);
      setCurrentAccount(accounts[0]);
      setEthBalance(ethBalance);
      setIsConnected(true);
    }
    // setIsConnected(true);
  };

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      const web3Accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.log("Error..");
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
      }
    };

    const handleChainChanged = async (chainId) => {
      const web3ChainId = await web3.eth.getChainId();
      setChainId(web3ChainId);
    };

    const handleBalance = async (ethBalance) => {
      const web3ethBalance = await web3.eth.getBalance();
      setEthBalance(web3ethBalance);
    };
    // const handleAddressChanged = async (address) => {
    //   const web3Address = await web3.eth.getAddress();
    //   if (address.length === 0) {
    //     console.log("Errorrr");
    //   } else if (address !== userBalance) {
    //     setUserBalance(address);
    //   }
    // };

    if (isConnected) {
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("Balanced", handleBalance);
      // provider.publicConfigStore.on("update", handleBalance);
      // provider.on("addressChanged", handleAddressChanged);
    }

    return () => {
      if (isConnected) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
        provider.removeListener("Balanced", handleBalance);
        // provider.removeListener("addressChanged", handleAddressChanged);
      }
    };
  }, [isConnected]);

  const onLogout = () => {
    setIsConnected(false);
  };

  const getCurrentNetwork = (chainId) => {
    return NETWORKS[chainId];
  };

  // const getCurrentBalance = (ethBalance) => {
  //   return BALANCE(ethBalance)
  // }

  return (
    <div className="App">
      <main>
        {!isConnected && <Login onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          <Wellcome
            currentAccount={currentAccount}
            currentNetwork={getCurrentNetwork(chainId)}
            currentBalance={ethBalance}
          />
        )}
      </main>
    </div>
  );
}

export default App;
