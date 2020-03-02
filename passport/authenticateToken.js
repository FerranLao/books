import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secretito"
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    console.log(payload)
    try {
      done(null, payload);
    } catch (e) {
      console.log(e)
      done(e, null);
    }
  })
);
