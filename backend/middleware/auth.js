import jwt from "jsonwebtoken";
import User from "../models/AuthModel.js"; // Adjust the path as necessary
import dotenv from "dotenv";

dotenv.config();

export const VerifyToken = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

      if (!token) {
        return res.status(401).json({
          auth: false,
          message: "Access denied. No token provided.",
        });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user based on token payload
      const user = await User.findById(decoded.id).lean();

      if (!user) {
        return res.status(401).json({
          auth: false,
          message: "Access denied. User not found.",
        });
      }

      // Check if the user's role is allowed
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return res.status(403).json({
          auth: false,
          message: `Access denied. Your role (${user.role}) does not have the required permissions.`,
        });
      }

      req.userData = user; // Attach user to request
      next();
    } catch (err) {
      console.error("JWT Verification Error:", err);

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ auth: false, message: "Access denied. Token has expired." });
      }
      return res.status(403).json({ auth: false, message: "Access denied. Invalid token." });
    }
  };
};