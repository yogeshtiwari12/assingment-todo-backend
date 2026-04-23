import jwt from "jsonwebtoken"; 
import { User } from "../model/user.js";


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "No token provided" });                
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.user = user;
        return next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
};