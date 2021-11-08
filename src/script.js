const fs = require('fs');

function script(name) {
  return fs.readFileSync(`${__dirname}/flows/${name}.num`).toString();
}

module.exports = script;