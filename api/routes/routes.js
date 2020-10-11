// #region Using modules
const express = require('express');
const apiRouter = express();
const userRoute = require('./user/user.routes')
// #endregion

apiRouter.use('/user', userRoute);

module.exports = apiRouter;
