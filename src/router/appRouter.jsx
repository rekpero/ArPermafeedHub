import * as React from "react";
import App from "../App";
import ApiService from "../services/api";
import AddFeedPage from "../pages/addfeedspage";
import HomePage from "../pages/homepage";
import ViewFeedPage from "../pages/viewfeedpage";
import YourFeedsPage from "../pages/yourfeedspage";
import { toast } from "bulma-toast";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet:
        sessionStorage.getItem("wallet") === null
          ? null
          : JSON.parse(sessionStorage.getItem("wallet")),
      walletAddress:
        sessionStorage.getItem("walletAddress") === null
          ? ""
          : sessionStorage.getItem("walletAddress"),
      allFeeds: [],
      filterAllFeeds: [],
      yourFeeds: [],
      filterYourFeeds: [],
      tab: 0,
      txid: "",
      addedTxId: [],
      notifications: []
    };
  }

  setWallet = (wallet, walletAddress) => {
    sessionStorage.setItem("wallet", JSON.stringify(wallet));
    sessionStorage.setItem("walletAddress", walletAddress);
    this.setState({ wallet, walletAddress }, () => {
      this.getMyFeeds();
    });
  };

  logout = () => {
    sessionStorage.removeItem("wallet");
    sessionStorage.removeItem("walletAddress");
    this.setState({
      wallet: null,
      walletAmount: 0,
      walletAddress: "",
      yourFeeds: []
    });
  };

  componentDidMount() {
    this.getAllFeeds();
    this.getMyFeeds();
  }

  getMyFeeds = () => {
    if (this.state.wallet !== null) {
      ApiService.getYourFeeds(this.state.walletAddress).then(data => {
        this.setState({ yourFeeds: data, filterYourFeeds: data });
      });
    }
  };

  getAllFeeds = () => {
    ApiService.getAllFeeds().then(data => {
      this.setState({ allFeeds: data, filterAllFeeds: data });
      console.log(data);
    });
  };

  sortAllFeeds = sortBy => {
    const allFeeds = this.state.allFeeds;
    if (sortBy === "ranking") {
      const sortFeeds = allFeeds.sort((a, b) => a.rank - b.rank);
      this.setState({ allFeeds: sortFeeds, filterAllFeeds: sortFeeds });
    } else if (sortBy === "latest") {
      const sortFeeds = allFeeds.sort((a, b) => b.time - a.time);
      this.setState({ allFeeds: sortFeeds, filterAllFeeds: sortFeeds });
    }
  };

  filterAllFeeds = filterBy => {
    const allFeeds = this.state.allFeeds;
    const filterFeeds = allFeeds.filter(
      feed => feed.title.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1
    );
    this.setState({ filterAllFeeds: filterFeeds });
  };

  sortYourFeeds = sortBy => {
    const yourFeeds = this.state.yourFeeds;
    if (sortBy === "ranking") {
      const sortFeeds = yourFeeds.sort((a, b) => a.rank - b.rank);
      this.setState({ yourFeeds: sortFeeds, filterYourFeeds: sortFeeds });
    } else if (sortBy === "latest") {
      const sortFeeds = yourFeeds.sort((a, b) => b.time - a.time);
      this.setState({ yourFeeds: sortFeeds, filterYourFeeds: sortFeeds });
    }
  };

  filterYourFeeds = filterBy => {
    const yourFeeds = this.state.yourFeeds;
    const filterFeeds = yourFeeds.filter(
      feed => feed.title.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1
    );
    this.setState({ filterYourFeeds: filterFeeds });
  };

  setTab = tab => {
    this.setState({ tab });
  };
  setTxId = txid => {
    this.setState({ txid });
  };

  addTxId = txId => {
    const { addedTxId } = this.state;
    addedTxId.push(txId);
    console.log(addedTxId);
    this.setState({ addedTxId }, () => {
      this.watchTxStatus();
    });
  };
  watchTxStatus = () => {
    clearInterval(this.txWatcher);
    this.txWatcher = setInterval(() => {
      const getStatus = async () => {
        console.log(this.state.addedTxId);
        const getTxStatus = await ApiService.getTxStatus(this.state.addedTxId);
        getTxStatus.forEach((status, i) => {
          if (status !== undefined) {
            const { addedTxId } = this.state;
            const txId = addedTxId.splice(i, 1);

            this.setState({ addedTxId }, () => {
              toast({
                message: "Your Permafeed has been mined",
                type: "is-success",
                duration: 3000,
                dismissible: true,
                pauseOnHover: true,
                closeOnClick: true,
                animate: { in: "fadeIn", out: "fadeOut" }
              });
              const { notifications } = this.state;
              notifications.push({ txId: txId[0] });
              this.setState({ notifications });
              this.getAllFeeds();
              if (!this.state.addedTxId.length) {
                clearInterval(this.txWatcher);
              }
            });
          }
        });
        console.log(getTxStatus);
      };

      getStatus();
    }, 5000);
  };

  render() {
    return (
      <App
        wallet={this.state.wallet}
        walletAddress={this.state.walletAddress}
        setWallet={this.setWallet}
        logout={this.logout}
        setTxId={this.setTxId}
        setTab={this.setTab}
        tab={this.state.tab}
        notifications={this.state.notifications}
      >
        {this.state.tab === 0 ? (
          <HomePage
            wallet={this.state.wallet}
            walletAddress={this.state.walletAddress}
            allFeeds={this.state.filterAllFeeds}
            sortAllFeeds={this.sortAllFeeds}
            filterAllFeeds={this.filterAllFeeds}
            setTab={this.setTab}
            setTxId={this.setTxId}
          />
        ) : null}
        {this.state.tab === 1 ? (
          <YourFeedsPage
            wallet={this.state.wallet}
            walletAddress={this.state.walletAddress}
            yourFeeds={this.state.filterYourFeeds}
            sortYourFeeds={this.sortYourFeeds}
            filterYourFeeds={this.filterYourFeeds}
            setTab={this.setTab}
            setTxId={this.setTxId}
          />
        ) : null}
        {this.state.tab === 2 ? (
          <AddFeedPage
            wallet={this.state.wallet}
            walletAddress={this.state.walletAddress}
            addTxId={this.addTxId}
          />
        ) : null}
        {this.state.tab === 3 ? (
          <ViewFeedPage
            wallet={this.state.wallet}
            walletAddress={this.state.walletAddress}
            allFeeds={this.state.allFeeds}
            txid={this.state.txid}
          />
        ) : null}
      </App>
    );
  }
}
export default AppRouter;
