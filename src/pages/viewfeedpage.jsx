import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import ApiService from "../services/api";
import SendTipModal from "../components/sendtipmodalcomponent";
import FeedDetails from "../components/feeddetailscomponent";
import FeedStatistics from "../components/feedstatisticscomponent";
import TestQuery from "../components/testquerycomponent";
import CommentFeed from "../components/commentfeedcomponent";
import TipsFeed from "../components/feedtipscomponent";

const ViewFeedPage = props => {
  const [feedItems, setFeedItems] = React.useState([]);
  const [feed, setFeed] = React.useState();
  const [openSendTip, setOpenSendTip] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [chartData, setChartData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const feed = props.allFeeds.filter(
      feed => feed.txid === props.match.params.id
    )[0];
    console.log(feed);
    if (feed !== undefined) {
      setFeed(feed);
      ApiService.getFeedDetails(
        feed.tagExpr1,
        feed.tagExpr2,
        feed.address
      ).then(data => {
        const sortedData = data.sort((a, b) => a.timestamp - b.timestamp);
        setFeedItems(sortedData);
        console.log(sortedData);
        const labels = sortedData
          .map(data => moment.unix(data.timestamp).format("MMM Do YYYY"))
          .filter((value, index, arr) => arr.indexOf(value) === index);
        console.log(labels);
        const datas = labels.map(
          label =>
            sortedData.filter(
              data =>
                moment.unix(data.timestamp).format("MMM Do YYYY") === label
            ).length
        );
        console.log(datas);
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "No. of Feed By Date",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: datas
            }
          ]
        };
        setChartData(chartData);
        setLoading(false);
      });
    }
  }, [props.allFeeds]);

  const closeSendTip = () => {
    setOpenSendTip(false);
  };

  const openSend = () => {
    setOpenSendTip(true);
  };

  const changeTab = tab => {
    setTab(tab);
  };

  return (
    <div>
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{feed !== undefined ? feed.title : ""}</h1>
            <h2 className="subtitle is-6">
              {feed !== undefined
                ? moment(feed.time).format("MMM Do YYYY, h:mm:ss a")
                : ""}
            </h2>
            <h2 className="subtitle" style={{ marginBottom: 4 }}>
              {feed !== undefined ? feed.address : ""}
            </h2>
            <button className="button is-link" onClick={openSend}>
              <span className="icon">
                <i className="fas fa-paper-plane"></i>
              </span>
              <span>Send Tip</span>
            </button>
            <SendTipModal
              openSendTip={openSendTip}
              closeSendTipModal={closeSendTip}
              sendToAddress={feed !== undefined ? feed.address : ""}
              wallet={props.wallet}
              txId={feed !== undefined ? feed.txid : ""}
            />
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className={tab === 0 ? "is-active" : ""}>
                  <a onClick={e => changeTab(0)}>Details</a>
                </li>
                <li className={tab === 1 ? "is-active" : ""}>
                  <a onClick={e => changeTab(1)}>Statistic</a>
                </li>
                <li className={tab === 2 ? "is-active" : ""}>
                  <a onClick={e => changeTab(2)}>Test Query</a>
                </li>
                <li className={tab === 3 ? "is-active" : ""}>
                  <a onClick={e => changeTab(3)}>Comments</a>
                </li>
                <li className={tab === 4 ? "is-active" : ""}>
                  <a onClick={e => changeTab(4)}>Tips</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
      <div className="container" style={{ padding: 18 }}>
        {tab === 0 ? <FeedDetails feed={feed} /> : null}
        {tab === 1 ? (
          <FeedStatistics
            feedItems={feedItems}
            chartData={chartData}
            loading={loading}
          />
        ) : null}
        {tab === 2 ? <TestQuery feed={feed} /> : null}
        {tab === 3 ? <CommentFeed wallet={props.wallet} feed={feed} /> : null}
        {tab === 4 ? <TipsFeed feed={feed} /> : null}
      </div>
    </div>
  );
};
export default withRouter(ViewFeedPage);
