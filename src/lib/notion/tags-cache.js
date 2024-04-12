/* eslint @typescript-eslint/no-var-requires: 0 */
// use commonjs so it can be required without transpiling

const fs = require("fs");

const { TAGS_CACHE } = require("./server-constants");

exports.set = function (results) {
  fs.writeFileSync(TAGS_CACHE, JSON.stringify(results));
};

exports.expire = function () {
  return fs.unlinkSync(TAGS_CACHE);
};
