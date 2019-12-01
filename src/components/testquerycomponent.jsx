import React from "react";
import ApiService from "../services/api";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const TestQuery = props => {
  const [query, setQuery] = React.useState({});
  const [response, setResponse] = React.useState({});
  const [isRun, setRun] = React.useState(false);
  const [isCorrectInput, setCorrectInput] = React.useState(true);

  const runQuery = () => {
    setRun(true);
    ApiService.runQuery(query).then(data => {
      setResponse(data.splice(0, 5));
      setRun(false);
    });
  };
  return (
    <div>
      <h1 className="title is-4" style={{ marginBottom: 12 }}>
        Run Test ArQL Query
      </h1>
      <div className="columns">
        <div className="column">
          <h1 className="title is-5" style={{ marginBottom: 12 }}>
            Request
          </h1>
          <JSONInput
            id="a_unique_id"
            placeholder={query}
            theme={"light_mitsuketa_tribute"}
            locale={locale}
            onChange={_ => {
              if (_.error) {
                setCorrectInput(false);
              } else {
                setCorrectInput(true);
                setQuery(_.jsObject);
              }
            }}
          />
          <div style={{ marginTop: 18 }}>
            <button
              className="button is-link"
              onClick={runQuery}
              disabled={isRun || !isCorrectInput}
            >
              <span className="icon">
                <i className="fas fa-play"></i>
              </span>
              <span>Run</span>
            </button>
          </div>
        </div>
        <div className="column">
          <h1 className="title is-5" style={{ marginBottom: 12 }}>
            Response
          </h1>
          <JSONInput
            id="a_unique_id_1"
            placeholder={response}
            theme={"light_mitsuketa_tribute"}
            locale={locale}
            viewOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TestQuery;
