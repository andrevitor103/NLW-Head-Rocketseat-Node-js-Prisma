import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3Controller } from "./controllers/GetLast3Controller";
import { UserProfileController } from "./controllers/UserProfileController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last3", new GetLast3Controller().handle);
router.get("/profile", ensureAuthenticated, new UserProfileController().handle);

export { router };
