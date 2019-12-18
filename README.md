# Ar Permafeed Hub

<img src="https://github.com/mmitrasish/ArPermafeedHub/blob/master/public/logo.png" width="100" height="100">

**Ar Permafeed Hub** is an permaweb app that indexes permafeeds on [Arweave](https://www.arweave.org/). Here you can browse feeds, reading the details provided about them by their owners as well as details extracted from the blockweave and also list your permafeeds easily from your wallet.

## Ar Neighbour Link

- [**Permaweb**](https://arweave.net/ykmk26E0J48qxAlPmOOxqMNZB8C-Vs62Rfmd8DKwVds)
- [**Github Demo**](https://mmitrasish.github.io/ArPermafeedHub/build/)

## Features

- [x] Add wallet by simply importing your wallet key
- [x] Add feeds by filling the form
- [x] View all permafeeds provided by the owner
- [x] View your permafeeds
- [x] Tip permafeed
- [x] Ranking by tips by users
- [x] See details of permafeeds including Statistics and ArQL/GraphQL example
- [x] Run ArQL test query
- [x] Comment on permafeed
- [ ] Run GraphQL test query

## How to Publish Your Permafeed

- **Go to Add Feed Page**

<img src="https://github.com/mmitrasish/ArPermafeedHub/blob/master/screetshots/screenshots.png">

- **Enter the required fields**

**For example:** for the permafeed present in the below code can be published by submitting correct inputs in the form.

```
{
  op: "and",
  expr1: {
    op: "equals",
    expr1: "from",
    expr2: ADDRESS
  },
  expr2: {
    op: "equals",
    expr1: EXPR1,
    expr2: EXPR2
  }
}
```

1. **Address** - This is the address of the permafeed owner and also required for showing the permafeed statistics, **e.g - ADDRESS in the above code**
1. **Tag**
   1. **Tag Expression 1** - This the expression 1 of your permafeed tag, **e.g - EXPR1 in the above code**
   1. **Tag Expression 2** - This the expression 2 of your permafeed tag, **e.g - EXPR2 in the above code**
1. **Title** - Enter a title for your permafeed.
1. **Description** - Enter a description for your permafeed.
1. **Examples** - Enter your example GraphQL/ArQL code to access the feed along with it's description. You can enter more than one examples by clicking **Add Example** button.

- **Submit your permafeed by clicking Submit button.**
- **Now you can view your permafeed in Home page & also in My Feed page.**

## Dependencies

1. React v16.10.2
1. Arweave v1.4.1
1. Bulma v0.8.0
1. Moment v2.24.0
1. React-Chartjs-2 v2.8.0

## Reference

- github repo: https://github.com/ArweaveTeam/arweave-js
- official docs: https://docs.arweave.org/developers/
