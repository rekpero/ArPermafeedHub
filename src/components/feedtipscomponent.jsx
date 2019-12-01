import React from "react";
import ApiService from "../services/api";
import moment from "moment";

const TipsFeed = props => {
  return (
    <div>
      <div className="columns is-mobile is-centered">
        <div className="column is-full-mobile is-three-quarters-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          {props.feed !== undefined ? (
            props.feed.tips.length !== 0 ? (
              props.feed.tips.map((tip, i) => (
                <div key={i}>
                  <div>
                    <strong>{tip.owner}</strong>
                  </div>
                  <div className="has-text-grey-light is-size-6">
                    {moment.unix(tip.time).fromNow()}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <strong>Amount:</strong>{" "}
                    {Number.parseFloat(ApiService.convertToAr(tip.amount))} AR
                  </div>
                  <hr style={{ marginTop: 12, marginBottom: 18 }} />
                </div>
              ))
            ) : (
              <h2 className="title is-5">No Tips Given</h2>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TipsFeed;
