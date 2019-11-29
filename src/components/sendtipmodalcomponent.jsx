import React from "react";
import ApiService from "../services/api";

const SendTipModal = props => {
  const [amount, setAmount] = React.useState(0);

  const sendTip = () => {
    console.log(props.sendToAddress, amount, props.wallet, props.txId);
    ApiService.sendTip(props.sendToAddress, amount, props.wallet, props.txId)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div className={"modal " + (props.openSendTip ? "is-active" : null)}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <header className="modal-card-head">
          <p className="modal-card-title">Send tip</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.closeSendTipModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Send To</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter wallet address of your feed"
                value={props.sendToAddress}
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Enter wallet address of your feed"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={sendTip}
            disabled={props.wallet === null}
          >
            Send
          </button>
          {props.wallet === null ? (
            <span
              className="has-text-danger is-size-5 has-text-weight-semibold"
              style={{ marginLeft: 18 }}
            >
              Login to tip feed
            </span>
          ) : null}
        </footer>
      </div>
      <div className="control">
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={props.closeSendTipModal}
        ></button>
      </div>
    </div>
  );
};

export default SendTipModal;
