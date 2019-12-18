import React from "react";
import LoginModal from "./loginmodalcomponent";

const AppBar = props => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openNavBar, setOpenNavBar] = React.useState(false);
  const closeLogin = () => {
    setOpenLoginModal(false);
  };
  const openLogin = () => {
    setOpenLoginModal(true);
  };

  const viewFeed = txId => {
    props.setTxId(txId);
    props.setTab(3);
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" onClick={e => props.setTab(0)}>
          <strong className="title">PermaHub</strong>
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={e => setOpenNavBar(!openNavBar)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={"navbar-menu " + (openNavBar ? "is-active" : null)}
      >
        <div className="navbar-start">
          <a
            className={"navbar-item " + (props.tab === 0 ? "is-active" : null)}
            onClick={e => props.setTab(0)}
          >
            Home
          </a>
          <a
            className={"navbar-item " + (props.tab === 1 ? "is-active" : null)}
            onClick={e => props.setTab(1)}
          >
            My Feeds
          </a>
          <a
            className={"navbar-item " + (props.tab === 2 ? "is-active" : null)}
            onClick={e => props.setTab(2)}
          >
            Add Feeds
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button
                  class="button is-light"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu4"
                >
                  <span class="icon">
                    <i class="fas fa-bell" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                  {!props.notifications.length ? (
                    <div class="dropdown-item">
                      <p>No notification present</p>
                    </div>
                  ) : (
                    props.notifications.map(notification => (
                      <div
                        class="dropdown-item"
                        onClick={e => viewFeed(notification.txId)}
                      >
                        <a>
                          Tx {notification.txId.substr(0, 4)}...
                          {notification.txId.substr(-4, 4)} has been mined
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {props.wallet === null ? (
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-link" onClick={openLogin}>
                  <strong>Login</strong>
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <span className="icon has-text-link">
                  <i className="fas fa-circle"></i>
                </span>

                <strong>
                  {props.walletAddress.substr(0, 4)}...
                  {props.walletAddress.substr(-4, 4)}
                </strong>
              </a>

              <div className="navbar-dropdown">
                <a
                  className="navbar-item"
                  href={
                    "https://viewblock.io/arweave/address/" +
                    props.walletAddress
                  }
                >
                  Wallet
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={props.logout}>
                  Logout
                </a>
              </div>
            </div>
          )}

          <LoginModal
            openLogin={openLoginModal}
            closeLoginModal={closeLogin}
            setWallet={props.setWallet}
          />
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
