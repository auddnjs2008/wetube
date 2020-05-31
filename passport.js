import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback",
  }),
  githubLoginCallback
);
passport.serializeUser(User.serializeUser());
//헤이 passport 쿠키에는 오직 user.id만 담아서 보내도록해

passport.deserializeUser(User.deserializeUser());
