const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Copy static and admin folders straight through
  eleventyConfig.addPassthroughCopy({ "static": "/" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Nunjucks "date" filter compatible with our templates
  eleventyConfig.addNunjucksFilter("date", (value, format = "dd LLL yyyy") => {
    // allow "now" or missing value
    const dt =
      value === "now" || !value
        ? DateTime.now()
        : value instanceof Date
        ? DateTime.fromJSDate(value)
        : DateTime.fromJSDate(new Date(value));

    // common short-cuts: "yyyy" used in footer
    if (String(format).toLowerCase() === "yyyy") return dt.toFormat("yyyy");

    // default to Luxon formatting (e.g., "dd LLL yyyy")
    return dt.toFormat(format);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
