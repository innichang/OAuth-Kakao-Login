const { dataSource } = require("./dataSource");

const checkUserByKakaoId = async kakaoId => {
  try {
    const [user] = await dataSource.query(
      `SELECT 
      EXISTS
      (SELECT 1 
      FROM users 
      WHERE kakao_id = ?
      ) 
      `,
      [kakaoId]
    );
    return user;
  } catch (err) {
    err = new Error("DATASOURCE ERROR");
    err.statusCode = 400;
    throw err;
  }
};

const getUserByKakaoId = async kakaoId => {
  const user = await dataSource.query(
    `SELECT
        id
        FROM users
        WHERE users.kakao_id = ?
        `,
    [kakaoId]
  );
  return user[0].id;
};

const signUpWithKakao = async (kakaoId, email, nickName) => {
  const user = await dataSource.query(
    `INSERT INTO 
        users(
          kakao_id,
          email,
          name
        ) VALUES (?, ?, ?)
      `,
    [kakaoId, email, nickName]
  );
  return user.insertId;
};

module.exports = {
  checkUserByKakaoId,
  getUserByKakaoId,
  signUpWithKakao
};
