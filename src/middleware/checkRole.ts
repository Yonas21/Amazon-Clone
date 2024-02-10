import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";

export const checkRole = (roles: Array<string>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const userId = res.locals.jwtPayload.userId;

		try {
			const userRepository = UserRepository; // Make sure UserRepository is an instance of your repository
			const user = await userRepository.findOneOrFail({
				where: { id: userId },
			});

			console.log("User", user);

			if (roles.indexOf(user.role) > -1) {
				// User has the required role, proceed to the next middleware/route
				next();
			} else {
				// User does not have the required role, send a 401 Unauthorized response
				res.status(401).send("Unauthorized");
			}
		} catch (error) {
			// Handle the error if the user is not found
			console.error("Error:", error);
			res.status(401).send("Unauthorized");
		}
	};
};
