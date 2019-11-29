import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

const YourFeedPage = props => {
  const viewFeed = txid => {
    props.history.push(`/feeds/${txid}`);
  };

  return (
    <div className="container" style={{ marginTop: 18 }}>
      {props.yourFeeds.length === 0 ? (
        <h2 className="title is-4 has-text-centered">No Data To Show</h2>
      ) : (
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            {props.yourFeeds.map((feed, i) => (
              <div className="card" key={i} style={{ marginBottom: 18 }}>
                <div className="card-content">
                  <p className="title is-4">{feed.title}</p>
                  <p className="subtitle is-6" style={{ marginBottom: 8 }}>
                    {moment(feed.time).format("MMM Do YYYY, h:mm:ss a")}
                  </p>
                  <span
                    className="tag is-primary has-text-weight-bold is-medium"
                    style={{ marginBottom: 16 }}
                  >
                    {feed.address.substr(0, 4)}...{feed.address.substr(-4, 4)}
                  </span>
                  <p>{feed.description}</p>
                </div>
                <footer className="card-footer">
                  <a
                    className="card-footer-item"
                    onClick={e => viewFeed(feed.txid)}
                  >
                    View
                  </a>
                </footer>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(YourFeedPage);
