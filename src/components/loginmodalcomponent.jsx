import React from "react";
import ApiService from "../services/api";

const LoginModal = props => {
  const [filename, setFilename] = React.useState("");
  const [wallet, setWallet] = React.useState();
  const [walletAddress, setWalletAddress] = React.useState("");
  const loadPrivateKey = event => {
    handleFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  // load file to json
  const handleFile = file => {
    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  // set pk json to state
  const handleFileRead = async e => {
    const jwk = JSON.parse(e.target.result);
    let address = await ApiService.getWalletAddress(jwk);
    setWallet(jwk);
    setWalletAddress(address);
    // props.setWallet(jwk, address);
  };

  const loginWallet = () => {
    props.setWallet(wallet, walletAddress);

    props.closeLoginModal();
  };

  return (
    <div className={"modal " + (props.openLogin ? "is-active" : null)}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <header className="modal-card-head">
          <p className="modal-card-title">Log in with Arweave wallet</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.closeLoginModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="file has-name is-right is-fullwidth">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="wallet"
                onChange={loadPrivateKey}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name">{filename}</span>
            </label>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={loginWallet}>
            Login
          </button>
        </footer>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={props.closeLoginModal}
      ></button>
    </div>
  );
};

export default LoginModal;
