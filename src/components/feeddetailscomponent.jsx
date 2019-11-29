import React from "react";

const FeedDetails = props => {
  return (
    <div>
      <h1 className="title is-4" style={{ marginBottom: 12 }}>
        Description
      </h1>
      <p style={{ marginBottom: 18 }}>
        {props.feed !== undefined ? props.feed.description : null}
      </p>
      <h1 className="title is-4" style={{ marginBottom: 12 }}>
        ArQL/GraphQL Example Code
      </h1>
      {props.feed !== undefined
        ? props.feed.example.map((ex, i) => (
            <div style={{ marginBottom: 12 }} key={i}>
              <p>
                <span className="has-text-weight-bold">{i + 1}. </span>
                {ex.description}
              </p>
              <pre>
                <code>{ex.code}</code>
              </pre>
            </div>
          ))
        : null}
    </div>
  );
};

export default FeedDetails;
