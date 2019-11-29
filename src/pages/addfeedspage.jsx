import React from "react";
import ApiService from "../services/api";

class AddFeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.walletAddress,
      tag1: "",
      tag2: "",
      title: "",
      description: "",
      example: [{ code: "", description: "" }]
    };
  }
  handleExampleChange = (event, index, type) => {
    const newEx = this.state.example;
    if (type === "description") {
      newEx[index].description = event.target.value;
    } else if (type === "code") {
      newEx[index].code = event.target.value;
    }
    this.setState({ example: newEx });
  };

  addExample = () => {
    this.setState({
      example: [...this.state.example, { description: "", code: "" }]
    });
  };

  setAddress = event => {
    this.setState({ address: event.target.value });
  };

  setTag1 = event => {
    this.setState({ tag1: event.target.value });
  };

  setTag2 = event => {
    this.setState({ tag2: event.target.value });
  };

  setTitle = event => {
    this.setState({ title: event.target.value });
  };

  setDescription = event => {
    this.setState({ description: event.target.value });
  };

  submitFeeds = () => {
    const feed = {
      address: this.state.address,
      tagExpr1: this.state.tag1,
      tagExpr2: this.state.tag2,
      title: this.state.title,
      description: this.state.description,
      example: this.state.example
    };

    console.log(feed);
    ApiService.postFeed(feed, this.props.wallet).then(data =>
      console.log(data)
    );
  };

  render() {
    return (
      <div className="columns is-mobile is-centered" style={{ marginTop: 18 }}>
        <div className="column is-full-mobile is-three-quarters-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          <div className="card has-background-light" style={{ padding: 12 }}>
            <div className="card-content">
              <div className="has-text-centered">
                <h3 className="title">Add Feed</h3>
              </div>
              <div className="field">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter wallet address of your feed"
                    value={this.state.address}
                    onChange={this.setAddress}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tag</label>
                <div className="field is-horizontal">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter the tag expr 1"
                      value={this.state.tag1}
                      onChange={this.setTag1}
                    />
                  </div>
                  <div
                    className="title"
                    style={{ marginLeft: 18, marginRight: 18, marginBottom: 8 }}
                  >
                    :
                  </div>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter the tag expr 2"
                      value={this.state.tag2}
                      onChange={this.setTag2}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter the title of your feed"
                    value={this.state.title}
                    onChange={this.setTitle}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Enter the description of your feed"
                    value={this.state.description}
                    onChange={this.setDescription}
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <div>
                  <label className="label" style={{ marginBottom: 12 }}>
                    Example ArQL/GraphQL Code{" "}
                    <span>
                      <button
                        className="button is-info is-small"
                        style={{ marginLeft: 18 }}
                        onClick={this.addExample}
                      >
                        Add Example
                      </button>
                    </span>
                  </label>
                </div>
                {this.state.example.map((ex, i) => (
                  <div style={{ marginBottom: 18 }} key={i}>
                    <label className="label">Example {i + 1}</label>
                    <div className="control" style={{ marginBottom: 12 }}>
                      <input
                        className="input"
                        type="text"
                        placeholder="Enter the description for your example"
                        value={ex.description}
                        onChange={e =>
                          this.handleExampleChange(e, i, "description")
                        }
                      />
                    </div>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Enter the arql/graphql example to access your feed"
                        value={ex.code}
                        onChange={e => this.handleExampleChange(e, i, "code")}
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
              <div className="control">
                <button
                  className="button is-link"
                  disabled={this.props.wallet === null}
                  onClick={this.submitFeeds}
                >
                  Submit
                </button>
                {this.props.wallet === null ? (
                  <span
                    className="has-text-danger is-size-4 has-text-weight-semibold"
                    style={{ marginLeft: 18 }}
                  >
                    Login to submit feed
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFeedPage;
