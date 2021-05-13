const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  map: false,
  plugins: [
    "cssnano",
    "tailwindcss",
    "autoprefixer",
    "postcss-import",
    postcssPresetEnv({
      stage: 2,
      browsers:
        "last 2 Chrome versions, last 2 Firefox versions, last 2 Opera versions",
    }),
  ],
};
