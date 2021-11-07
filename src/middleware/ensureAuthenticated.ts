import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
  exp: number;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  //const authToken = "Bearer bf0dc68a232aa3212905";
  if (!authToken) {
    return response.status(401).json({
      errorCode: "Token invalid",
    });
  }
  if (!/^Bearer./i.test(authToken)) {
    return response.status(401).json({
      errorCode: "Token bad formatted",
    });
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub, exp } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.user_id = sub;
    return next();
  } catch (err) {
    response.status(401).json({
      errorCode: "Token expired",
    });
  }
}
