const Wellcome = (props) => {
  return (
    <div className="wellcome">
      <h1>Wellcome</h1>
      <p>{props.currentAccount}</p>
      <p>Current Network: {props.currentNetwork}</p>
      <p>Balance: {props.currentBalance}</p>
    </div>
  );
};

export default Wellcome;
