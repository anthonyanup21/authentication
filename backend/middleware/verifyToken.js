import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.jwt; // ✅ make sure to use req.cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);


        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = decoded.id; // ✅ only store the ID
        next();
    } catch (error) {
        console.error("Error in verifyToken middleware:", error);
        res.status(403).json({ message: "Invalid token" });
    }
};
