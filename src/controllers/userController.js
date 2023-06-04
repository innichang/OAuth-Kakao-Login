const userService = require("../services/userService");
const { catchAsync } = require("../middlewares/error");

const kakaoLogin = catchAsync(async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) return res.status(400).json({ message: "NO ACCESS TOKEN" });

  const token = await userService.kakaoLogin(accessToken);

  if (!token) return res.status(400).json({ message: "FAIL" });
  return res.status(200).send({ webToken: token });
});

module.exports = {
  kakaoLogin
};
