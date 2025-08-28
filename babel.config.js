module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-worklets/plugin",
      [
        "module-resolver",
        {
          root: ["./src"], // src is root directory start import from it
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
          alias: {
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@components": "./src/components",
            "@services": "./src/services",
            "@constants": "./src/constants",
            "@types": "./src/types",
            "@utils": "./src/utils",
            "@theme": "./src/theme",
          },
        },
      ],
      // Reanimated must be last:
      "react-native-reanimated/plugin",
    ],
  };
};
