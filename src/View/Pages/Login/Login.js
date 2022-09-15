import { useState, useEffect } from "react";

const Login = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(window.ethereum);

  useEffect(() => {
    setProvider(detectProvider());
  }, []);

  useEffect(() => {
    if (provider) {
      if (provider !== window.ethereum) {
        console.error("Error...");
      }
    }
  }, [provider]);

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("Error");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error("Error...");
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });

      setIsConnecting(false);
      props.onLogin(provider);
    }
  };

  return (
    <div className="Login">
      <button onClick={onLoginHandler} className="button" type="button">
        {!isConnecting && "Connect"}
        {isConnecting && "Loading"}
      </button>
    </div>
  );
};

export default Login;
