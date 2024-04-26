import  express from "express";
import  {
  login,
  signup,
} from "../controllers/userController.js";
import {
  signupValidationRules,
  loginValidationRules,
  validate,
} from "../middlewares/validators.js";
// import { isAdmin } from "../middlewares/routerProtection";

const router = express.Router();

router.post("/signup", validate(signupValidationRules), signup);
router.post("/login", validate(loginValidationRules), login);
// router.get("/users", isAdmin, allUsers);
// router.get("/singleUser/:userId", getUserById)
// router.put(
//   "/edit-profile/:userId",
//   validate(profileUpdateValidationRules),
//   editProfile
// );
// router.put(
//   "/change-password/:userId",
//   validate(passwordChangeValidationRules),
//   changePassword
// );
// router.put("/assign-role/:userId", isAdmin, updateUserRole);
export default router;