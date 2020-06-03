import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  getChangePassword,
  postChangePassword,
  postEditProfile,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;

// M V C  -> M: data를 의미  V -> view 데이터가 어떻게 생겼는지
// C ->  데이터를 보여주는 함수
