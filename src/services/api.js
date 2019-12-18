import arweave from "./arweave";
import { currentUnixTime, getAppName } from "./utils";

class ApiService {
  getWalletAddress = wallet => {
    return arweave.wallets.jwkToAddress(wallet);
  };

  getWalletAmount = address => {
    return arweave.wallets.getBalance(address);
  };

  convertToAr = amount => {
    return arweave.ar.winstonToAr(amount);
  };

  getTxStatus = async txIds => {
    const getAllStatus = await Promise.all(
      txIds.map(txId => this.fetchStatus(txId))
    );
    return getAllStatus;
  };

  fetchStatus = async txId => {
    const res = await fetch(`https://arweave.net/tx/${txId}/status`)
      .then(data => data.json())
      .catch(err => console.log(err));
    return res;
  };

  postFeed = async (feed, wallet) => {
    Object.assign(feed, {
      time: currentUnixTime(),
      type: "feed"
    });

    const transaction = await arweave.createTransaction(
      {
        data: JSON.stringify(feed)
      },
      wallet
    );
    transaction.addTag("Transaction-Type", feed.type);
    transaction.addTag("Time", feed.time);
    transaction.addTag("App-Name", getAppName());

    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    return response;
  };

  commentFeed = async (comment, wallet, feedTxId) => {
    Object.assign(comment, {
      time: currentUnixTime(),
      type: "comment"
    });

    const transaction = await arweave.createTransaction(
      {
        data: JSON.stringify(comment)
      },
      wallet
    );
    transaction.addTag("Transaction-Type", comment.type);
    transaction.addTag("Time", comment.time);
    transaction.addTag("Comment-For", feedTxId);
    transaction.addTag("App-Name", getAppName());

    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    return response;
  };

  getCommentByFeedId = async txnId => {
    const query = {
      op: "and",
      expr1: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "Transaction-Type",
          expr2: "comment"
        },
        expr2: {
          op: "equals",
          expr1: "Comment-For",
          expr2: txnId
        }
      },
      expr2: {
        op: "equals",
        expr1: "App-Name",
        expr2: getAppName()
      }
    };

    const txids = await arweave.arql(query);
    if (txids.length === 0) return [];

    const transactions = await Promise.all(
      txids.map(txid => arweave.transactions.get(txid))
    );

    const allTransactions = await Promise.all(
      transactions.map(async (transaction, id) => {
        let transactionNew = JSON.parse(
          transaction.get("data", {
            decode: true,
            string: true
          })
        );
        Object.assign(transactionNew, {
          owner: await arweave.wallets.ownerToAddress(transaction.get("owner")),
          txid: txids[id]
        });

        return transactionNew;
      })
    );

    // console.log(stringifiedTransactions);
    return allTransactions;
  };

  getAllFeeds = async () => {
    const query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "Transaction-Type",
        expr2: "feed"
      },
      expr2: {
        op: "equals",
        expr1: "App-Name",
        expr2: getAppName()
      }
    };

    const txids = await arweave.arql(query);
    if (txids.length === 0) return [];

    const transactions = await Promise.all(
      txids.map(txid => arweave.transactions.get(txid))
    );

    const allFeedTransactions = await Promise.all(
      transactions.map(async (transaction, id) => {
        let transactionNew = JSON.parse(
          transaction.get("data", {
            decode: true,
            string: true
          })
        );
        Object.assign(transactionNew, {
          txid: txids[id],
          tips: await this.getTipByTxId(txids[id]),
          comments: await this.getCommentByFeedId(txids[id])
        });
        Object.assign(transactionNew, {
          tipAmount:
            transactionNew.tips.length === 0
              ? 0
              : transactionNew.tips
                  .map(tip => Number.parseInt(tip.amount))
                  .reduce((prev, curr) => prev + curr)
        });
        return transactionNew;
      })
    );

    const sortFeedByTip = allFeedTransactions.sort(
      (a, b) => b.tipAmount - a.tipAmount
    );

    sortFeedByTip.forEach((feed, i) => {
      Object.assign(feed, {
        rank: i + 1
      });
      return feed;
    });

    // console.log(stringifiedTransactions);
    return sortFeedByTip;
  };

  getYourFeeds = async address => {
    const query = {
      op: "and",
      expr1: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "Transaction-Type",
          expr2: "feed"
        },
        expr2: {
          op: "equals",
          expr1: "from",
          expr2: address
        }
      },
      expr2: {
        op: "equals",
        expr1: "App-Name",
        expr2: getAppName()
      }
    };

    const txids = await arweave.arql(query);
    if (txids.length === 0) return [];

    const transactions = await Promise.all(
      txids.map(txid => arweave.transactions.get(txid))
    );

    const allFeedTransactions = await Promise.all(
      transactions.map(async (transaction, id) => {
        let transactionNew = JSON.parse(
          transaction.get("data", {
            decode: true,
            string: true
          })
        );
        Object.assign(transactionNew, {
          txid: txids[id],
          tips: await this.getTipByTxId(txids[id]),
          comments: await this.getCommentByFeedId(txids[id])
        });
        Object.assign(transactionNew, {
          tipAmount:
            transactionNew.tips.length === 0
              ? 0
              : transactionNew.tips
                  .map(tip => Number.parseInt(tip.amount))
                  .reduce((prev, curr) => prev + curr)
        });
        return transactionNew;
      })
    );

    let sortFeedByTip = allFeedTransactions.sort(
      (a, b) => b.tipAmount - a.tipAmount
    );

    sortFeedByTip.forEach((feed, i) => {
      Object.assign(feed, {
        rank: i + 1
      });
      return feed;
    });

    console.log(sortFeedByTip);

    // console.log(stringifiedTransactions);
    return sortFeedByTip;
  };

  sendTip = async (toAddress, amount, wallet, txId) => {
    console.log(
      (arweave.ar.arToWinston(amount) * 75) / 100,
      (arweave.ar.arToWinston(amount) * 25) / 100
    );
    const transaction = await arweave.createTransaction(
      {
        target: toAddress,
        quantity: arweave.ar.arToWinston((amount * 75) / 100),
        reward: arweave.ar.arToWinston((amount * 25) / 100)
      },
      wallet
    );
    transaction.addTag("Transaction-Type", "Tip");
    transaction.addTag("Tip-For", txId);
    transaction.addTag("Time", currentUnixTime());
    transaction.addTag("App-Name", getAppName());

    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    return response;
  };

  runGraphql = async query => {
    const result = await arweave.api.post("/arql", {
      query: query
    });
    console.log(result);
  };

  runQuery = async query => {
    const txids = await arweave.arql(query);
    if (txids.length === 0) return [];

    const transactions = await Promise.all(
      txids.map(txid => arweave.transactions.get(txid))
    );

    const allTransactions = await Promise.all(
      transactions.map(async (transaction, id) => {
        let transactionNew = JSON.parse(
          transaction.get("data", {
            decode: true,
            string: true
          })
        );
        return transactionNew;
      })
    );

    // console.log(stringifiedTransactions);
    return allTransactions;
  };

  getTipByTxId = async txId => {
    const query = {
      op: "and",
      expr1: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "Transaction-Type",
          expr2: "Tip"
        },
        expr2: {
          op: "equals",
          expr1: "Tip-For",
          expr2: txId
        }
      },
      expr2: {
        op: "equals",
        expr1: "App-Name",
        expr2: getAppName()
      }
    };
    const txids = await arweave.arql(query);
    if (txids.length === 0) return [];

    const transactions = await Promise.all(
      txids.map(txid => arweave.transactions.get(txid))
    );

    const allTipTransactions = await Promise.all(
      transactions.map(async (transaction, id) => {
        let txDetails = await this.fetchBlockHash(txids[id]);
        let blockDetails = await this.fetchBlockDetails(
          txDetails.block_indep_hash
        );
        let transactionNew = {
          owner: await arweave.wallets.ownerToAddress(transaction.get("owner")),
          amount: transaction.get("quantity"),
          txid: txids[id],
          time: blockDetails.timestamp
        };

        return transactionNew;
      })
    );

    // console.log(stringifiedTransactions);
    return allTipTransactions;
  };

  getFeedDetails = async (expr1, expr2, address) => {
    const query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "from",
        expr2: address
      },
      expr2: {
        op: "equals",
        expr1: expr1,
        expr2: expr2
      }
    };

    // console.log(query)

    const txids = await arweave.arql(query);
    if (txids.length === 0) return [];

    const transactions = await Promise.all(
      txids.map(txid => arweave.transactions.get(txid))
    );

    const allFeedTransactions = await Promise.all(
      transactions.map(async (transaction, id) => {
        let transactionNew = JSON.parse(
          transaction.get("data", {
            decode: true,
            string: true
          })
        );
        let txDetails = await this.fetchBlockHash(txids[id]);
        let blockDetails = await this.fetchBlockDetails(
          txDetails.block_indep_hash
        );
        // console.log(blockDetails)
        Object.assign(transactionNew, {
          txid: txids[id],
          timestamp: blockDetails.timestamp
        });
        return transactionNew;
      })
    );

    // console.log(stringifiedTransactions);
    return allFeedTransactions;
  };

  fetchBlockHash = async txid => {
    const response = await fetch(`https://arweave.net/tx/${txid}/status`);
    const data = await response.json();
    return data;
  };

  fetchBlockDetails = async blockHash => {
    const response = await fetch(`https://arweave.net/block/hash/${blockHash}`);
    const data = await response.json();
    return data;
  };
}

export default new ApiService();
