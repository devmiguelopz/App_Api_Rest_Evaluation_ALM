// #region Using modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbManager = require("./api/database/connect");
const config = require("./api/config/config");
const apiRouter = require("./api/routes/routes");
// #endregion


// #region Config environment
dotenv.config({
  path: process.env.PATH_ENVIRONMENT
});
// #endregion


// #region Initialize Server
const server = express();
// #endregion


// #region Initialize DataBase
dbManager.connectDb({
  url:process.env.DATA_BASE_URL
})
// #endregion


// #region Set middleware
process.env.ENVIRONMENT == config.EnvironmentDevelopment && server.use(morgan(config.MorganSettings));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));
// #endregion


// #region Listen routes
server.use(config.PathRoot,express.static(path.join(__dirname, config.PathPublic)));
server.use(config.PathApi, apiRouter);
// #endregion


// #region Listen connect
server.listen(process.env.PORT, () => {
  console.info(`Server started - ${process.env.PORT}`);
});
// #endregion

module.exports = server;
