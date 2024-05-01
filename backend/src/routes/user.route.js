import { loginUser, registerUser, getCurrentUser, logout } from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()


// register user
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logout)

router.route("/current-user").get(verifyJWT , getCurrentUser)



export default router