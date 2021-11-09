const numary = require('numary');
const cluster = numary();
const ledger = cluster.getLedger('v-store-01');

module.exports = ledger;