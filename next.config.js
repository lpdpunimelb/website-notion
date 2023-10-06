// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      "www.notion.so",
      "notion.so",
      "images.unsplash.com",
      "pbs.twimg.com",
      "s3.us-west-2.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    websiteTitle: process.env.NEXT_PUBLIC_WEBSITE_TITLE ?? "LPDP Unimelb",
    rootPageId:
      process.env.NEXT_PUBLIC_ROOT_PAGE_ID ??
      "5c538bee9c7140d5ab74e2f571c29f2a",
    subjectReviewsGappsScriptUrl:
      process.env.NEXT_PUBLIC_SUBJECT_REVIEWS_GAPPS_URL ??
      "https://script.google.com/macros/s/AKfycbwl2grBT673-fPCRjR1LpNyPUyPKizN5b5jsTmzalaAg_fkaBWkR7Y89QxNmoXP_HDy/exec",
  },
});
