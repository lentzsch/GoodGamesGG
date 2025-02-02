/*************************** REQUIRES ***************************/
const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const db = require("../db/models");
const { loginReq, asyncHandler } = require("../utils");

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
// router.use(loginReq())
// router.use(cookieParser())
/*************************** ROUTES ***************************/
// /mygames/ get all mygames

// const userNotFound = (userId) => {
//   const err = new Error(`User at id:${userId} not found.`);
//   err.title = 'User not found.'
//   err.status = 404;
//   throw err;
// }

const gameNotFound = (gameId) => {
  const err = new Error(`Game at id:${gameId} not found.`);
  err.title = "Game not found.";
  err.status = 404;
  throw err;
};

const libraryNotFound = (libraryId) => {
  const err = new Error(`Library at id:${libraryId} not found.`);
  err.title = "Library not found.";
  err.status = 404;
  throw err;
};

router.get(
  "/",
  asyncHandler(async (req, res, next) => {


    const userId = req.session.user.id;
    const user = await db.User.findByPk(userId, {
      include: [{ model: db.Game, as: "user_mygames" }],
    });

    const { user_mygames: games } = user;

    const libraries = await db.Library.findAll({
      where: {
        userId: userId,
      },
    });
    const consoles = await db.Console.findAll();

    res.render("mygames", {
      req,
      title: "My Games",
      games,
      libraries,
      consoles,
    });
  })
);

router.get(
  "/:played(\\d)",
  asyncHandler(async (req, res, next) => {
    const userId = req.session.user.id;
    const playedStatus = parseInt(req.params.played, 10);
    const user = await db.User.findByPk(userId, {
      include: [{ model: db.Game, as: "user_mygames" }],
    });

    const games = user.user_mygames.filter(
      (game) => game.My_game.played === playedStatus
    );

    const libraries = await db.Library.findAll({
      where: {
        userId: userId,
      },
    });

    const consoles = await db.Console.findAll();
    res.render("mygames", {
      req,
      title: "My Games",
      games,
      libraries,
      consoles,
    });
  })
);

// get specific library
router.get(
  "/libraries/:libraryId(\\d+)",
  asyncHandler(async (req, res) => {
    const libraryId = parseInt(req.params.libraryId, 10);
    const userId = req.session.user.id;
    const library = await db.Library.findByPk(libraryId, {
      include: [{ model: db.Game, as: "library_games" }],
    });
    const libraries = await db.Library.findAll({
      where: {
        userId: userId,
      },
    });
    const consoles = await db.Console.findAll();
    if (!library) {
      next(libraryNotFound(libreryId));
    } else {
      const { library_games: games } = library;
      res.render("mygames", {
        req,
        title: "My Games",
        games,
        libraries,
        libraryId,
        consoles,
      });
    }
  })
);

// add to overall mygames list
router.post(
  "/:gameId(\\d+)/add",
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    const userId = req.session.user.id;

    const exists = await db.My_game.findOne({
      where: {
        gameId: gameId,
        userId: userId,
      },
    });

    if (exists) {
      res.json({ exists });
      // res.redirect('/')
      return;
    }

    let { played } = req.body;
    // const game = await db.Game.findByPk(gameId);
    if (!played) {
      played = 0;
    }

    const mygame = await db.My_game.create({ played, userId, gameId });
    res.json({ mygame });
    // res.redirect('/');
  })
);

// add a library
router.post(
  "/libraries/add",
  asyncHandler(async (req, res) => {
    const userId = req.session.user.id;
    const { name } = req.body;
    // console.log(name);

    const library = await db.Library.create({ name, userId });
    // res.json({ library })
    res.redirect("/mygames");
  })
);

// add a game to a library
router.post(
  "/libraries/:libraryId(\\d+)/:gameId(\\d+)/add",
  asyncHandler(async (req, res) => {
    const libraryId = parseInt(req.params.libraryId, 10);
    const gameId = parseInt(req.params.gameId, 10);
    const { id: userId } = req.session.user;

    const libraryGame = await db.Library.findByPk(libraryId);
    const exists = await db.Library_game.findOne({
      where: {
        gameId: gameId,
        libraryId: libraryId,
      },
    });

    if (exists) {
      res.json({ exists, libraryGame });
      return;
    }

    await db.Library_game.create({ libraryId, gameId });

    let mygame = await db.My_game.findOne({
      where: {
        gameId,
        userId,
      },
    });

    if (!mygame) {
      mygame = await db.My_game.create({ played: 2, gameId, userId });
    }

    res.json({ libraryGame, mygame });
    // res.redirect('/libraries/:libraryId(\\+)');
  })
);

// change played status
router.put(
  "/:gameId(\\d+)/played",
  asyncHandler(async (req, res, next) => {
    const gameId = parseInt(req.params.gameId, 10);
    const mygame = await db.My_game.findOne({
      where: {
        gameId: gameId,
      },
    });

    if (!mygame) {
      next(gameNotFound(mygame));
    } else {
      const { played } = req.body;
      const newPlayed = await mygame.update({ played });
      res.json({ newPlayed });
    }

    //res.redirect('/')
  })
);

// remove game from mygames
router.delete(
  "/:userId(\\d+)/:gameId(\\d+)/delete",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const gameId = parseInt(req.params.gameId, 10);
    const mygame = await db.My_game.findOne({
      where: {
        gameId: gameId,
        userId: userId,
      },
    });

    if (!mygame) {
      next(gameNotFound(gameId));
    } else {
      mygame.destroy();
      res.status(204).end();
    }
  })
);

// remove game from library
router.delete(
  "/libraries/:libraryId(\\d+)/:gameId(\\d+)/delete",
  asyncHandler(async (req, res, next) => {
    const libraryId = parseInt(req.params.libraryId, 10);
    const gameId = parseInt(req.params.gameId, 10);
    const library = await db.Library.findByPk(libraryId);

    const game = await db.Game.findByPk(gameId);

    const libraryGame = await db.Library_game.findOne({
      where: {
        gameId: gameId,
        libraryId: libraryId,
      },
    });

    if (!game) {
      next(gameNotFound(gameId));
    } else if (!library) {
      next(libraryNotFound(libraryId));
    } else {
      libraryGame.destroy();
      res.status(204).end();
    }
  })
);

// remove library
router.delete(
  "/libraries/:libraryId(\\d+)/delete",
  asyncHandler(async (req, res, next) => {
    const libraryId = parseInt(req.params.libraryId, 10);
    const library = await db.Library.findByPk(libraryId);
    
    if (!library) {
      next(libraryNotFound(libraryId));
    } else {
      library.destroy();
      res.status(204).end();
    }
  })
);

// edit library name
router.put(
  "/libraries/:libraryId(\\d+)/edit",
  asyncHandler(async (req, res) => {
    const libraryId = parseInt(req.params.libraryId, 10);
    const library = await db.Library.findByPk(libraryId);
    const { name } = req.body;

    if (!library) {
      next(libraryNotFound(libraryId));
    } else {
      const newLibrary = await library.update({ name });
      res.json({ newLibrary });
      //   res.redirect('/:userId(\\d+)/libraries');
    }
  })
);

router.post(
  "/api",
  asyncHandler(async (req, res) => {
    const { filter, orderType, pageNum } = req.body;

    if (filter.match(/^\d/g)) {
      const min = parseInt(filter);
      const games = await Game.findAll({
        where: {
          overallRating: {
            [Op.gte]: min,
          },
        },
        order: [[orderType, "DESC"]],
      });
      res.json({ games });
    } else if (filter === "all") {
      const games = await Game.findAll({
        order: [[orderType, "DESC"]],
      });
      res.json({ games });
    } else {
      const consoleType = filter;
      const games = await Game.findAll({
        include: {
          model: Console,
          as: "game_consoles",
          where: {
            name: consoleType,
          },
        },
        order: [[orderType, "DESC"]],
      });
      res.json({ games });
    }
  })
);

/*************************** EXPORTS ***************************/
module.exports = router;
