import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <strong className="title">PermaHub</strong>
        </Link>

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
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/my-feed">
            My Feeds
          </Link>
          <Link className="navbar-item" to="/add-feed">
            Add Feeds
          </Link>
        </div>

        <div className="navbar-end">
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