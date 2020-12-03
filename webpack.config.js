const path = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const notifier = require("node-notifier");
const icon = path.join(__dirname, "src/assets/logo.png");
const SpeedMeasureWebpack5Plugin = require("speed-measure-webpack5-plugin");
const smw = new SpeedMeasureWebpack5Plugin();
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = smw.wrap({
  // mode: env.development ? "development" : "production", //配置的模式 一会讲
  devtool: "source-map", //调试工具的选择 一会讲
  context: process.cwd(), //上下文目录 根目录
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"), //输出的路径
    filename: "[name].js", //输出的文件名
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        let error = errors[0];
        notifier.notify({
          title: "webpack编译失败",
          message: severity + ":" + error.name,
          subtitle: error.file || "",
          icon,
        });
      },
    }),
    new BundleAnalyzerPlugin(),
  ],
});
