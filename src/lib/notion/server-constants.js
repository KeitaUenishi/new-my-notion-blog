/* eslint @typescript-eslint/no-var-requires: 0 */
// use commonjs so it can be required without transpiling

const path = require("path");

const NOTION_API_SECRET = process.env.NOTION_API_SECRET;
const DATABASE_ID = process.env.DATABASE_ID;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
const NEXT_PUBLIC_GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
const BLOG_INDEX_CACHE = path.resolve(".blog_index_data");
const BLOG_ARCHIVE_CACHE = path.resolve("./public/blog_archive_data.json");
const TAGS_CACHE = path.resolve("./public/tags_data.json");
const NUMBER_OF_POSTS_PER_PAGE = 10;

module.exports = {
  NOTION_API_SECRET,
  DATABASE_ID,
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_GA_TRACKING_ID,
  BLOG_INDEX_CACHE,
  BLOG_ARCHIVE_CACHE,
  TAGS_CACHE,
  NUMBER_OF_POSTS_PER_PAGE,
};
