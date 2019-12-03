import React from "react";
import { withRouter } from "react-router-dom";
import FeedCard from "../components/feedcardcomponent";

const HomePage = props => {
  const viewFeed = txid => {
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
                onChange={e => props.filterAllFeeds(e.target.value)}
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
                  onClick={e => props.sortAllFeeds("ranking")}
                >
                  Ranking
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => props.sortAllFeeds("latest")}
                >
                  Latest
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {props.allFeeds.length === 0 ? (
        <h2 className="title is-4 has-text-centered">No Data To Show</h2>
      ) : (
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            {props.allFeeds.map((feed, i) => (
              <FeedCard feed={feed} viewFeed={viewFeed} key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
