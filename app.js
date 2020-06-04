import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter"; // default로 export 한게 아니니 이런식으로
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import "./passport";

const app = express();

const CokieStore = MongoStore(session);
//middleware

app.use(helmet()); // 보안을 위해 쓰는것
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); // 다이렉터에서 파일을 보내주는것
app.use("/static", express.static("static")); // 다이렉터에서 파일을 보내주는것

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // loggin

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); // local 변수에 접근하기위해

//router
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

// app.use("/user", userRouter);
// /user 경로로 접속하면 userRouter를 사용하겠다.

export default app;
//누군가 내 파일을 import 할 때 난 app을 주겠다.
// app.js 파일을 import 할 때
