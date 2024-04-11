import * as blogArchiveCache from "@/lib/notion/blog-archive-cache";

export const getArchive = (allPosts = []) => {
  if (blogArchiveCache.exists()) {
    console.log("Using cached blog archive");
    return blogArchiveCache.get();
  }
  const archiveData = allPosts.reduce((acc, post) => {
    const year = post.Date.substring(0, 4);
    const yearMonth = post.Date.substring(0, 7);

    // 既にキーが存在する場合はカウントをインクリメント
    if (!acc[year]) {
      acc[year] = { count: 0, months: {} };
    }
    acc[year].count += 1;

    if (!acc[year].months[yearMonth]) {
      acc[year].months[yearMonth] = 0;
    }
    acc[year].months[yearMonth] += 1;

    return acc;
  }, {});

  const archive = Object.keys(archiveData).map((year) => ({
    year,
    count: archiveData[year],
    months: Object.keys(archiveData[year].months).map((month) => ({
      month,
      count: archiveData[year].months[month],
    })),
  }));

  blogArchiveCache.set(archive);
  return archive;
};
