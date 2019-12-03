import React from "react";
import FeedCard from "../components/feedcardcomponent";

const YourFeedPage = props => {
  const viewFeed = txid => {
    // props.history.push(`/feeds/${txid}`);
    props.setTxId(txid);
    props.setTab(3);
  };

  return (
    <div className="container" style={{ marginTop: 18 }}>
      <nav className="level">
        <div className="level-left">
          <span style={{ marginRight: 18 }}>
            <strong>Search by Title: </strong>
          </span>
          <span>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search"
                onChange={e => props.filterYourFeeds(e.target.value)}
              />
            </div>
          </span>
        </div>

        <div className="level-right">
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu4"
              >
                <span>Sort by</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
              <div className="dropdown-content">
                <a
                  className="dropdown-item"
                  onClick={e => props.sortYourFeeds("ranking")}
                >
                  Ranking
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => props.sortYourFeeds("latest")}
                >
                  Latest
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {props.yourFeeds.length === 0 ? (
        <h2 className="title is-4 has-text-centered">No Data To Show</h2>
      ) : (
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            {props.yourFeeds.map((feed, i) => (
              <FeedCard feed={feed} viewFeed={viewFeed} key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YourFeedPage;
