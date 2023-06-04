const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/kakao", userController.kakaoLogin);

module.exports = { router };
