const jwt = require("jsonwebtoken");
const axios = require("axios");
const userDao = require("../models/userDao");

const kakaoLogin = async accessToken => {
  try {
    const kakaoResult = await axios({
      method: "POST",
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    });
    const {
      id: kakaoId,
      properties: { nickname: nickName },
      kakao_account: { email: email }
    } = kakaoResult.data;

    const user = await userDao.checkUserByKakaoId(kakaoId);
    const userResult = Number(Object.values(user)[0]);

    let userId;
    userResult ? (userId = await userDao.getUserByKakaoId(kakaoId)) : (userId = await userDao.signUpWithKakao(kakaoId, email, nickName));

    return jwt.sign(
      {
        id: userId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
        issuer: process.env.JWT_ISSUER
      }
    );
  } catch (err) {
    err = new Error("COULD NOT LOG IN THROUGH KAKAO");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  kakaoLogin
};
