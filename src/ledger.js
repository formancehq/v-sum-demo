const numary = require('numary');
const cluster = numary();
const ledger = cluster.getLedger('example-v-sum-01');

module.exports = ledger;