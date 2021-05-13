const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: { version: 3 },
        targets:
          "last 2 Chrome versions, last 2 Firefox versions, last 2 Opera versions",
        debug: false,
        shippedProposals: true,
      },
    ],
    [
      "@babel/preset-react",
      {
        useBuiltIns: true,
      },
    ],
    [
      "@babel/preset-typescript",
      {
        allExtensions: true,
        isTSX: true,
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
      },
    ],
  ],
};

// Jest needs module transformation
config.env = {
  test: {
    presets: config.presets,
    plugins: config.plugins,
  },
  production: {
    presets: config.presets,
    plugins: config.plugins,
  },
};

config.env.test.presets[0][1].modules = "auto";

module.exports = config;
