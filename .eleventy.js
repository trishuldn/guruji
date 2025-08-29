module.exports = function(eleventyConfig) {
eleventyConfig.addPassthroughCopy({ "static": "/" });
eleventyConfig.addPassthroughCopy({ "admin": "admin" });
return {
dir: {
input: "src",
includes: "_includes",
output: "_site"
},
markdownTemplateEngine: "njk",
htmlTemplateEngine: "njk"
};
};
