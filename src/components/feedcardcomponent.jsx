import React from "react";
import moment from "moment";
import ApiService from "../services/api";

const FeedCard = props => {
  return (
    <div className="card" style={{ marginBottom: 18 }}>
      <div className="card-content">
        <p style={{ marginBottom: 8 }}>
          <strong>Rank:</strong>{" "}
          <span className="tag is-info">{props.feed.rank}</span>
        </p>
        <p className="title is-4">{props.feed.title}</p>
        <p className="subtitle is-6" style={{ marginBottom: 8 }}>
          {moment(props.feed.time).format("MMM Do YYYY, h:mm:ss a")}
        </p>
        <span
          className="tag is-primary has-text-weight-bold is-medium"
          style={{ marginBottom: 16 }}
        >
          {props.feed.address.substr(0, 4)}...{props.feed.address.substr(-4, 4)}
        </span>
        <p>{props.feed.description}</p>
        <nav className="level" style={{ marginTop: 12 }}>
          <div className="level-item has-text-centered">
            <span className="icon">
              <i className="fas fa-comment"></i>
            </span>
            <span>{props.feed.comments.length}</span>
          </div>
          <div className="level-item has-text-centered">
            <span className="icon">
              <i className="fas fa-paper-plane"></i>
            </span>
            <span>
              {Number.parseFloat(ApiService.convertToAr(props.feed.tipAmount))}{" "}
              AR
            </span>
          </div>
        </nav>
      </div>
      <footer className="card-footer">
        <a
          className="card-footer-item"
          onClick={e => props.viewFeed(props.feed.txid)}
        >
          View
        </a>
      </footer>
    </div>
  );
};

export default FeedCard;
