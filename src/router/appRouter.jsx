import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import ApiService from "../services/api";
import AddFeedPage from "../pages/addfeedspage";
import HomePage from "../pages/homepage";
import ViewFeedPage from "../pages/viewfeedpage";
import YourFeedsPage from "../pages/yourfeedspage";

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
      filterYourFeeds: []
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

  render() {
    return (
      <Router>
        <App
          wallet={this.state.wallet}
          walletAddress={this.state.walletAddress}
          setWallet={this.setWallet}
          logout={this.logout}
        >
          <Route
            exact
            path="/add-feed"
            render={() => (
              <AddFeedPage
                wallet={this.state.wallet}
                walletAddress={this.state.walletAddress}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                wallet={this.state.wallet}
                walletAddress={this.state.walletAddress}
                allFeeds={this.state.filterAllFeeds}
                sortAllFeeds={this.sortAllFeeds}
                filterAllFeeds={this.filterAllFeeds}
              />
            )}
          />
          <Route
            exact
            path="/my-feed"
            render={() => (
              <YourFeedsPage
                wallet={this.state.wallet}
                walletAddress={this.state.walletAddress}
                yourFeeds={this.state.filterYourFeeds}
                sortYourFeeds={this.sortYourFeeds}
                filterYourFeeds={this.filterYourFeeds}
              />
            )}
          />
          <Route
            exact
            path="/feeds/:id"
            render={() => (
              <ViewFeedPage
                wallet={this.state.wallet}
                walletAddress={this.state.walletAddress}
                allFeeds={this.state.allFeeds}
              />
            )}
          />
        </App>
      </Router>
    );
  }
}
export default AppRouter;
