import { verifyToken } from "../utils/token.js";
export function authenticateToken(req, res, next){
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = decoded;
  req.user.admin = decoded.admin == 1;
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.user.admin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}