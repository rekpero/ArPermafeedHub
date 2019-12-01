import React from "react";
import ApiService from "../services/api";
import moment from "moment";

const CommentFeed = props => {
  const [comment, setComment] = React.useState("");
  const [isRun, setRun] = React.useState(false);
  const postComment = () => {
    setRun(true);
    ApiService.commentFeed({ comment }, props.wallet, props.feed.txid).then(
      data => {
        setComment("");
        setRun(false);
        console.log(data);
      }
    );
  };
  return (
    <div>
      <div className="columns is-mobile is-centered">
        <div className="column is-full-mobile is-three-quarters-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          {props.feed !== undefined
            ? props.feed.comments.length !== 0
              ? props.feed.comments.map((comment, i) => (
                  <div key={i}>
                    <div>
                      <strong>{comment.owner}</strong>
                    </div>
                    <div className="has-text-grey-light is-size-6">
                      {moment(comment.time).fromNow()}
                    </div>
                    <div style={{ marginTop: 8 }}>{comment.comment}</div>
                    <hr style={{ marginTop: 12, marginBottom: 18 }} />
                  </div>
                ))
              : null
            : null}
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Comment here"
                value={comment}
                onChange={e => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="has-text-right">
            <button
              className="button is-link"
              disabled={props.feed === undefined || isRun}
              onClick={postComment}
            >
              <span className="icon">
                <i className="fas fa-comment"></i>
              </span>
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentFeed;
