import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const accessTokenExpire = "15m";
const refreshTokenExpire = "7d";

// Generate Token
export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, secret, {
    expiresIn: accessTokenExpire,
  });

  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: refreshTokenExpire,
  });

  return { accessToken, refreshToken };
};

// Verify Token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
