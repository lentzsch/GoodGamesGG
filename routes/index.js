/*************************** REQUIRES ***************************/
const express = require("express");
const { csrfProtection, asyncHandler } = require("../utils");
const {
  User,
  Game,
  Console,
  User_console,
  Game_console,
} = require("../db/models");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const { rawListeners } = require("../app");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

/*************************** ROUTER SETUP ***************************/
const router = express.Router();
/*************************** MIDDLEWARE ***************************/
const userValidator = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("firstName should not be empty"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("LastName should not be empty"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a value for email")
    .isEmail()
    .withMessage("Email address is not valid email")
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided email is already in use by another account"
          );
        }
      });
    }),
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for username")
    .isLength({ max: 50 })
    .withMessage("Please make provide a username less than 50 characters long")
    .custom((value) => {
      return User.findOne({ where: { userName: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided username is already in use by another account"
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for password")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.confirmpassword) {
        return Promise.reject("Passwords must match");
      } else {
        return Promise.resolve();
      }
    }),
];

const loginReq = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect("/authorized");
  } else {
    next();
  }
};

const consolePreference = async (req, user) => {
  if (req.body.PC) {
    await User_console.create({ userId: user.id, consoleId: 3 });
  }
  if (req.body["Playstation 4"]) {
    await User_console.create({ userId: user.id, consoleId: 1 });
  }
  if (req.body["Xbox One"]) {
    await User_console.create({ userId: user.id, consoleId: 2 });
  }
  if (req.body["Nintendo Switch"]) {
    await User_console.create({ userId: user.id, consoleId: 4 });
  }
  if (
    !req.body.PC &&
    !req.body["Playstation 4"] &&
    !req.body["Xbox One"] &&
    !req.body["Nintendo Switch"]
  ) {
    await User_console.create({ userId: user.id, consoleId: 1 });
    await User_console.create({ userId: user.id, consoleId: 2 });
    await User_console.create({ userId: user.id, consoleId: 3 });
    await User_console.create({ userId: user.id, consoleId: 4 });
  }
};

/*************************** ROUTES ***************************/
router.get(
  "/",
  // loginReq,
  asyncHandler(async (req, res) => {
    const ps4Games = await Game.findAll({
      include: {
        model: Console,
        as: "game_consoles",
        where: {
          name: "Playstation 4",
        },
      },
      order: [["overallRating", "DESC"]],
      limit: 10,
    });
    const xboxGames = await Game.findAll({
      include: {
        model: Console,
        as: "game_consoles",
        where: {
          name: "Xbox One",
        },
      },
      order: [["overallRating", "DESC"]],
      limit: 10,
    });
    const pcGames = await Game.findAll({
      include: {
        model: Console,
        as: "game_consoles",
        where: {
          name: "PC",
        },
      },
      order: [["overallRating", "DESC"]],
      limit: 10,
    });
    const switchGames = await Game.findAll({
      include: {
        model: Console,
        as: "game_consoles",
        where: {
          name: "Nintendo Switch",
        },
      },
      order: [["overallRating", "DESC"]],
      limit: 10,
    });
    res.render("unauthorized", {
      req,
      title: "GoodGames",
      ps4Games,
      xboxGames,
      pcGames,
      switchGames,
    });
  })
);

router.get(
  "/authorized",
  asyncHandler(async (req, res) => {
    if (req.session && req.session.user) {
      const userId = req.session.user.id;
      const userPreference = await User_console.findAll({
        where: userId,
      });

      const userConsole = userPreference.map((game) => game.consoleId);

      const gameConsoles = await Game_console.findAll({
        where: { consoleId: userConsole },
        attributes: ["gameId"],
        limit: 36,
      });
      const gamesId = [];

      for (let i = 0; i < gameConsoles.length; i++) {
        if (!gamesId.includes(gameConsoles[i].gameId)) {
          gamesId.push(gameConsoles[i].gameId);
        }
        if (gamesId.length === 8) break;
      }

      const games = await Game.findAll({
        where: { id: gamesId },
        order: [["overallRating", "DESC"]],
      });

      res.render("authorized", {
        req,
        title: "GoodGames",
        games,
        user: req.session.user,
      });
    } else {
      res.redirect("/");
    }
  })
);

router.get(
  "/signup",
  loginReq,
  asyncHandler(async (req, res) => {
    const consoles = await Console.findAll();

    res.render("signup", {
      req,
      consoles,
      title: "Sign Up",
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      },
    });
  })
);

router.post(
  "/signup",
  userValidator,
  asyncHandler(async (req, res) => {
    const { userName, email, password, firstName, lastName, PC } = req.body;
    let validatorErrors = validationResult(req).errors;
    const consoles = await Console.findAll();
    if (validatorErrors.length > 0) {
      const user = { password, email, userName, firstName, lastName };
      res.status = 403;
      const errors = validatorErrors.map((error) => error.msg);

      res.render("signup", { req, title: "Sign Up", user, consoles, errors });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
        userName,
      });

      consolePreference(req, user);

      req.session.user = {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      res.redirect("/authorized");
    }
  })
);

router.get(
  "/login",
  loginReq,
  asyncHandler(async (req, res) => {
    res.render("login", { req, title: "Log in", userName: "" });
  })
);

router.post(
  "/login",
  loginReq,
  asyncHandler(async (req, res) => {
    const errors = [];
    const { userName, password } = req.body;
    let isPassword;
    const user = await User.findOne({ where: { userName } });
    if (user) {
      isPassword = await bcrypt.compare(password, user.hashedPassword);
    } else if (!user) errors.push("Username is incorrect");
    if (isPassword) {
      req.session.user = {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      res.redirect("/authorized");
    } else if (!isPassword) errors.push("Password is incorrect");
    res.render("login", { req, errors, userName });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    delete req.session.user;
    res.redirect("/");
  })
);

/*************************** EXPORTS ***************************/
module.exports = router;
