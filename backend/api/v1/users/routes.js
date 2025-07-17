const express = require("express");
const { sendUserBasicInfoController } = require("./controllers");

const usersRouter = express.Router();

usersRouter.get("/", sendUserBasicInfoController);

module.exports = { usersRouter };
