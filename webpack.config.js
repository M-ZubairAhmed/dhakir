const { join, resolve } = require("path");
const { env } = require("process");
const webpack = require("webpack");
const FilemanagerPlugin = require("filemanager-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WextManifestWebpackPlugin = require("wext-manifest-webpack-plugin");

const targetBrowser = process.env.TARGET_BROWSER;

const SOURCE_PATH = join(__dirname, "src");
const PUBLIC_PATH = join(SOURCE_PATH, "public");
const OUTPUT_PATH = join(__dirname, "build");

const getExtensionFileType = (browser) => {
  if (browser === "opera") {
    return "crx";
  }

  if (browser === "firefox") {
    return "xpi";
  }

  return "zip";
};

/** @type {import('webpack').Configuration} */
module.exports = {
  devtool: false, // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342
  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },
  mode:  "production",
  stats: "errors-only",
  entry: {
    manifest: join(PUBLIC_PATH, "manifest.json"),
    background: join(SOURCE_PATH, "background", "index.ts"),
    contentScript: join(SOURCE_PATH, "contentScript", "index.ts"),
    options: join(SOURCE_PATH, "options", "index.tsx"),
    newTab: join(SOURCE_PATH, "newTab", "index.tsx"),
  },
  output: {
    path: join(OUTPUT_PATH, targetBrowser),
    filename: "js/[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "webextension-polyfill-ts": resolve(
        join(__dirname, "node_modules", "webextension-polyfill-ts")
      ),
    },
  },
  module: {
    rules: [
      {
        type: "javascript/auto", // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
          loader: "wext-manifest-loader",
          options: {
            usePackageJSONVersion: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
           MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    // Plugin to not generate js bundle for manifest entry
    new WextManifestWebpackPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV", "TARGET_BROWSER"]),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: join(PUBLIC_PATH, "options.html"),
      inject: "body",
      scriptLoading: "defer",
      chunks: ["options"],
      hash: true,
      minify: true,
    }),
    new HtmlWebpackPlugin({
      filename: "newTab.html",
      template: join(PUBLIC_PATH, "newTab.html"),
      inject: "body",
      scriptLoading: "defer",
      chunks: ["newTab"],
      hash: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CopyWebpackPlugin({
      patterns: [{ from: join(PUBLIC_PATH, "icons"), to: "public/icons" }],
    }),
    new webpack.SourceMapDevToolPlugin({ filename: false }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new FilemanagerPlugin({
        events: {
          onEnd: {
            archive: [
              {
                format: "zip",
                source: join(OUTPUT_PATH, targetBrowser),
                destination: `${join(
                  OUTPUT_PATH,
                  targetBrowser
                )}.${getExtensionFileType(targetBrowser)}`,
                options: { zlib: { level: 6 } },
              },
            ],
          },
        },
      }),
    ],
  },
};
