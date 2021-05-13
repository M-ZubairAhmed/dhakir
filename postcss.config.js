const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  map: false,
  plugins: [
    "tailwindcss",
    "autoprefixer",
    "postcss-import",
    postcssPresetEnv({
      stage: 1,
      browsers: "> 2%, not dead, not ie 11",
    }),
  ],
};