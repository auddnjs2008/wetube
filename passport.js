import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import passport from "passport";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallBack,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://0d88ea23f5a7.ngrok.io${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallBack
  )
);
passport.serializeUser(User.serializeUser());
//헤이 passport 쿠키에는 오직 user.id만 담아서 보내도록해

passport.deserializeUser(User.deserializeUser());
