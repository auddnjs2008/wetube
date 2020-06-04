import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
// 데이터베이스를 변경해야 하면  postRequest여야 한다.
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
