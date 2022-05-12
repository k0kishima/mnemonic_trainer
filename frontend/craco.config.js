const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "$frontend": path.resolve(__dirname, "./src"),
    },
  },
};
