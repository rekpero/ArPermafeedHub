import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";

const FeedStatistics = props => {
  return (
    <div>
      {props.loading ? (
        <div className="has-text-centered">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>{" "}
        </div>
      ) : props.feedItems.length === 0 ? (
        <h2 className="title">No Data To Show</h2>
      ) : (
        <div>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div
                className="card has-background-light"
                style={{ padding: 12 }}
              >
                <div className="card-content">
                  <p className="heading">Number of Data Item</p>
                  <p className="title">{props.feedItems.length}</p>
                </div>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div
                className="card has-background-light"
                style={{ padding: 12 }}
              >
                <div className="card-content">
                  <p className="heading">First Post Time</p>
                  <p className="title is-4">
                    {props.feedItems.length === 0
                      ? ""
                      : moment
                          .unix(props.feedItems[0].timestamp)
                          .format("MMM Do YYYY")}
                  </p>
                  <p className="title is-4">
                    {props.feedItems.length === 0
                      ? ""
                      : moment
                          .unix(props.feedItems[0].timestamp)
                          .format("h:mm:ss a")}
                  </p>
                </div>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div
                className="card has-background-light"
                style={{ padding: 12 }}
              >
                <div className="card-content">
                  <p className="heading">Last Post Time</p>
                  <p className="title is-4">
                    {props.feedItems.length === 0
                      ? ""
                      : moment
                          .unix(
                            props.feedItems[props.feedItems.length - 1]
                              .timestamp
                          )
                          .format("MMM Do YYYY")}
                  </p>
                  <p className="title is-4">
                    {props.feedItems.length === 0
                      ? ""
                      : moment
                          .unix(
                            props.feedItems[props.feedItems.length - 1]
                              .timestamp
                          )
                          .format("h:mm:ss a")}
                  </p>
                </div>
              </div>
            </div>
          </nav>

          <div
            className="columns is-mobile is-centered"
            style={{ marginTop: 18 }}
          >
            <div className="column is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-three-quarters-widescreen is-three-quarters-fullhd">
              <div
                className="card has-background-light"
                style={{ padding: 12 }}
              >
                <div className="card-content">
                  {props.chartData !== undefined ? (
                    <Line data={props.chartData} height={100} width={300} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedStatistics;
