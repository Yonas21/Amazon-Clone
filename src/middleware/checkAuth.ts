import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = <string>req.headers["auth"];

	let jwtPayload;
	try {
		jwtPayload = jwt.verify(token, jwtSecret);
		res.locals.jwtPayload = jwtPayload;
	} catch (error) {
		console.log("Error", error);
		return res.status(401).send(error);
	}

	const { userId, username } = <any>jwtPayload;
	const newToken = jwt.sign({ userId, username }, jwtSecret, {
		expiresIn: "1h",
	});
	res.setHeader("token", newToken);

	next();
};
