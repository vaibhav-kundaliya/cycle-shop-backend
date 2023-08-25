const GoogleStrategy = require("passport-google-oauth2").Strategy;
const Consumer = require("../models/Consumer");
const resources = require("./resources");

const googleInitialize = (passport, getUserByEmail, getUserByID) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:8001/googleAuth",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const [firstName, lastName] = profile.displayName.split(" ");
          const consumerData = await getUserByEmail(profile.email);
          if (!consumerData) {
            const newConsumer = new Consumer({
              firstName: firstName,
              lastName: lastName,
              email: profile.email,
            });

            await newConsumer.save();
            console.log("New consumer added successfully");
          }

          cb(null, profile);
        } catch (error) {
          console.error(resources.messages.error.generic(error));
          cb(error);
        }
      }
    )
  );

  passport.serializeUser(async (user, done) => {
    try {
      const userID = await getUserByEmail(user.email);

      done(null, userID._id);
    } catch (err) {
      console.error(resources.messages.error.generic(err));
      done(err);
    }
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserByID(id);
      done(null, user);
    } catch (err) {
      console.error(resources.messages.error.generic(err));
      done(err);
    }
  });
};

module.exports = googleInitialize;
