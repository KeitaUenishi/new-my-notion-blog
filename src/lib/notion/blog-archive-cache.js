/* eslint @typescript-eslint/no-var-requires: 0 */
// use commonjs so it can be required without transpiling

const fs = require("fs");

const { BLOG_ARCHIVE_CACHE } = require("./server-constants");

exports.exists = function () {
  return fs.existsSync(BLOG_ARCHIVE_CACHE);
};

exports.get = function () {
  return JSON.parse(fs.readFileSync(BLOG_ARCHIVE_CACHE));
};

exports.set = function (results) {
  fs.writeFileSync(BLOG_ARCHIVE_CACHE, JSON.stringify(results));
};

exports.expire = function () {
  return fs.unlinkSync(BLOG_ARCHIVE_CACHE);
};
