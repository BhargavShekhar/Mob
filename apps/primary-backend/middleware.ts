import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization // bearer token

    const token = authHeader?.split(" ")[1];

    if(!token) {
        res.status(401).json({ msg: "Did not recived a token" });
        return;
    }

    const decode = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
        algorithms: ["RS256"]
    });

    if(!decode) {
        res.status(401).json({ msg: "User not authorized" });
        return;
    }

    const userId = (decode as any).sub;

    if(!userId) {
        res.status(401).json({ msg: "Could not get userId" });
        return;
    }

    req.userId = userId;

    next();
}