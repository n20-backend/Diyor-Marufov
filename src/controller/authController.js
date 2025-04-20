import { dbConnection } from "../db/index.js";
import {
  comparePassword,
  generateTokens,
  hashedPassword,
  verifyToken,
} from "../utils/index.js";

export const authController = {
  signUp: async (req, res, next) => {
    try {
      const {
        email,
        username,
        password,
        confirmPassword,
        role,
        firstName,
        lastName,
      } = req.body;

      if (password !== confirmPassword)
        return res
          .status(400)
          .json({ message: "Password doesn't match to confirm password" });

      const hashed = await hashedPassword(password);

      const query = `
            insert into authUsers (email,username,password,confirmPassword,role,firstName,lastName) values
            ($1,$2,$3,$4,$5,$6,$7) returning *`;

      const result = await dbConnection.query(query, [
        email,
        username,
        hashed,
        hashed,
        role,
        firstName,
        lastName,
      ]);

      if (result.rowCount === 0)
        return res.status(400).json({ message: `Authorized User not found` });

      const id = result.rows[0].userid;

      res.status(201).json({
        message: "User created",
        userId: id,
      });
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const query = `
        select * from authUsers where email = $1`;

      const result = await dbConnection.query(query, [email]);

      if (result.rowCount === 0)
        return res.status(401).send(`Authorized User not found`);

      const user = result.rows[0];

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid password" });

      const tokens = generateTokens({ user: user });

      res.json({
        tokens,
      });
    } catch (error) {
      next(error);
    }
  },

  currentUser: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer "))
        return res.status(401).json({ message: "No token provided" });

      const token = authHeader.split(" ")[1];
      const { valid, expired, decoded } = verifyToken(token);

      if (!valid)
        return res.status(401).json({
          message: expired ? "Token expired" : "Invalid token",
        });

      res.json(decoded);
    } catch (error) {
      next(error);
    }
  },

  logOut: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer "))
        return res.status(401).json({ message: "No token provided" });

      const token = authHeader.split(" ")[1];
      const { valid, expired } = verifyToken(token);

      if (!valid)
        return res.status(401).json({
          message: expired ? "Token expired" : "Invalid token",
        });

      res.json({
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  },

  updateRefreshToken: (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken)
        return res.status(401).json({
          message: "No refresh token provided",
        });

      const { valid, expired, decoded } = verifyToken(refreshToken);

      if (!valid)
        return res.status(401).json({
          message: expired ? "Refresh token expired" : "Invalid refresh token",
        });

      const payload = { decoded };

      const { accessToken, refreshToken: newRefreshToken } =
        generateTokens(payload);

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  },
};
