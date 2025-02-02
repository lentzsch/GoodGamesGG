"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const fetch = require("node-fetch");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await fetch(
      "https://api.rawg.io/api/games?key=b6fa635e114945c992c969cac137f6b4"
    );
    const { results } = await data.json();

    const games = [
      {
        title: "God of War",
        publisher: "Sony Interactive Entertainment",
        developer: "Santa Monica Studio",
        releaseDate: "2018-04-20",
        description:
          "A man ventures out on a quest to become a God.....of war.",
        overallRating: 5.0,
        imageHref: "/images/GOW-OG-image.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Final Fantasy XV",
        publisher: "Square Enix",
        developer: "Square Enix Business Division",
        releaseDate: "2016-11-29",
        description:
          "A group of friends must do a bunch of endless sidequests and fight monsters so that they can save their kingdom.",
        overallRating: 5.0,
        imageHref: "/images/finalfantasy.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Ghost of Tsushima",
        publisher: "Sony Interactive Entertainment",
        developer: "Sucker Punch Productions",
        releaseDate: "2020-07-17",
        description:
          "A disgraced Samurai from fuedal era Japan must stave off a Mongolian invasion with his trusty sword and the help of a few scoundrels along the way.",
        overallRating: 5.0,
        imageHref: "/images/tsushima.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Grand Theft Auto V",
        publisher: "Rockstar Games",
        developer: "Rockstar North",
        releaseDate: "2013-09-17",
        description:
          "Play as three different characters to pull off the ultimate heist.",
        overallRating: 4.9,
        imageHref: "/images/Grand_Theft_Auto_V.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "NBA 2K21",
        publisher: "2K Sports",
        developer: "Visual Concepts",
        releaseDate: "2020-09-04",
        description: "Play basketball as your favorite team.",
        overallRating: 3.9,
        imageHref: "/images/nba2k21.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Assassin's Creed: Odyssey",
        publisher: "Ubisoft",
        developer: "Ubisoft Quebec",
        releaseDate: "2018-10-05",
        description:
          "Go back in time and play as a Roman who fights for justice in a corrupt world. ",
        overallRating: 3.8,
        imageHref: "/images/assassins_creed_odyseey.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Spiderman",
        publisher: "Sony Interactive Entertainment",
        developer: "Insomniac Games",
        releaseDate: "2018-09-07",
        description:
          "Swing through the rugged streets of New York as your friendly neighborhood SpiderMan!",
        overallRating: 4.5,
        imageHref: "/images/marvels-spider-man-cover.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Horizon Zero Dawn",
        publisher: "Sony Interactive Entertainment",
        developer: "Guerilla Games",
        releaseDate: "2017-02-28",
        description:
          "In a world where technology could threaten your very existence how will you wield it's power?",
        overallRating: 4.2,
        imageHref: "/images/horizon_zero_dawn.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Last of Us",
        publisher: "Sony Computer Entertainment",
        developer: "Naughty Dog",
        releaseDate: "2013-06-14",
        description:
          "Facing the threat of a zombie apocalypse, one girl must venture out to deliver the cure to the last remaining civilization on Earth.",
        overallRating: 4.9,
        imageHref: "/images/Video_Game_Cover_-_The_Last_of_Us.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Last Guardian",
        publisher: "Sony Computer Entertainment",
        developer: "Japan Studio GenDesign",
        releaseDate: "2016-12-06",
        description: "A young monk goes on a journey he will never forget.",
        overallRating: 4.1,
        imageHref: "/images/lastguardian.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Super Smash Bros. Ultimate",
        publisher: "Nintendo",
        developer: "Bandai Namco Studios",
        releaseDate: "2018-12-07",
        description:
          "Play as your favorite characters in this ultimate fighting game.",
        overallRating: 4.0,
        imageHref: "/images/smachBros.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mario Kart 8",
        publisher: "Nintendo",
        developer: "Nintendo EAD",
        releaseDate: "2017-04-28",
        description: "Join Mario and pals in this fast-paced racing game.",
        overallRating: 4.6,
        imageHref: "/images/mario-kart-8-deluxe.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Legend of Zelda: Breath of the Wild",
        publisher: "Nintendo",
        developer: "Nintendo EPD",
        releaseDate: "2017-03-03",
        description:
          "Battle your way across Hyrule as Link, yet again, to reclaim the kingdom and save the princess.",
        overallRating: 5.0,
        imageHref: "/images/legend_of_zelda.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Microsoft Flight Simulator 2020",
        publisher: "Xbox Game Studios",
        developer: "Asobo Studio",
        releaseDate: new Date(2020, 8, 18),
        description:
          "From light planes to wide-body jets, fly highly detailed and accurate aircraft in the next generation of Microsoft Flight Simulator. Test your piloting skills against the challenges of night flying, real-time atmospheric simulation and live weather in a dynamic and living world.",
        overallRating: 3.7,
        imageHref: "/images/msfs-2020.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cities Skylines",
        publisher: "Paradox Interactive",
        developer: "Colossal Order",
        releaseDate: new Date(2017, 3, 10),
        description:
          "Cities: Skylines is a modern take on the classic city simulation. The game introduces new game play elements to realize the thrill and hardships of creating and maintaining a real city whilst expanding on some well-established tropes of the city building experience.",
        overallRating: 4.6,
        imageHref: "/images/cities-skylines.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Valheim",
        publisher: "Coffee Stain Publishing",
        developer: "Iron Gate Studio",
        releaseDate: new Date(2021, 2, 2),
        description:
          "A brutal exploration and survival game for 1-10 players, set in a procedurally-generated purgatory inspired by viking culture. Battle, build, and conquer your way to a saga worthy of Odin’s patronage!",
        overallRating: 4.8,
        imageHref: "/images/valheim.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "F1 2020",
        publisher: "Codemasters",
        developer: "Codemasters Birmingham",
        releaseDate: new Date(2020, 7, 10),
        description:
          "F1® 2020 allows you to create your F1® team for the very first time and race alongside the official teams and drivers.Alternatively, challenge your friends in new split - screen with casual race options for more relaxed racing.Compete on 22 circuits, with current and classic content.",
        overallRating: 4.4,
        imageHref: "/images/f1-2020.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Battlefield V",
        publisher: "Electronic Arts",
        developer: "EA DICE",
        releaseDate: new Date(2018, 11, 20),
        description:
          "This is the ultimate Battlefield V experience.Enter mankind’s greatest conflict with the complete arsenal of weapons, vehicles, and gadgets plus the best customization content of Year 1 and 2.",
        overallRating: 2.8,
        imageHref: "/images/battlefeild-v.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Port Royal 4",
        publisher: "Kalypso Media Digital",
        developer: "Gaming Minds Studios",
        releaseDate: new Date(2020, 9, 25),
        description:
          "Set sail and join the colonial powers of Spain, England, France and the Netherlands in their fight for supremacy of the Caribbean in the 17th century.",
        overallRating: 3,
        imageHref: "/images/port-royal-4.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Transport Fever 2",
        publisher: "Good Shepherd Entertainment",
        developer: "Urban Games",
        releaseDate: new Date(2019, 12, 11),
        description:
          "The classic transport simulation genre has a new gold standard with Transport Fever 2. Discover a whole new world by navigating transport routes through land, water and air.May progress and prosperity find their way!",
        overallRating: 4.5,
        imageHref: "/images/transport-fever-2.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Software Inc",
        publisher: "Coredumping",
        developer: "Coredumping",
        releaseDate: new Date(2015, 5, 1),
        description:
          "Construct and design buildings for optimal working conditions.Hire people to design and release software, so you can defeat the simulated competition and take over their businesses.Manage and educate your employees to make sure they are skilled and satisfied with their job.",
        overallRating: 4.6,
        imageHref: "/images/software-inc.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Planet Zoo",
        publisher: "Frontier Developments",
        developer: "Frontier Developments",
        releaseDate: new Date(2019, 11, 5),
        description:
          "Build a world for wildlife in Planet Zoo.From the developers of Planet Coaster and Zoo Tycoon comes the ultimate zoo sim.Construct detailed habitats, manage your zoo, and meet authentic living animals who think, feel and explore the world you create around them.",
        overallRating: 4.5,
        imageHref: "/images/planet-zoo.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Among Us",
        publisher: "Innersloth",
        developer: "Innersloth",
        releaseDate: new Date(2018, 11, 18),
        description:
          "An online and local party game of teamwork and betrayal for 4 - 10 players...in space!",
        overallRating: 3.5,
        imageHref: "/images/among-us.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    let brentsArray = [
      "fortnite",
      "league-of-legends",
      "rocket-league",
      "valorant",
      "kingdom-hearts-iii",
      "persona-5",
      "final-fantasy-vii-remake",
      "pokemon-2019",
      "animal-crossing-2019",
    ];

    let brentsHrefs = [
      "/images/fortnite.jpg",
      "/images/leagueoflegends.jpg",
      "/images/rocketleague.jpg",
      "/images/valorant.png",
      "/images/kh3.png",
      "/images/persona5.jpg",
      "/images/ff7.jpg",
      "/images/pokemonsword.jpg",
      "/images/animalcrossing.jpg",
    ];

    const res = brentsArray.map(async (slug) => {
      let res = await fetch(
        `https://api.rawg.io/api/games/${slug}?key=b6fa635e114945c992c969cac137f6b4`
      );
      return res.json();
    });

    const brentGames = await Promise.all(res);

    let brentFinalArray = [];

    for (let i = 0; i < brentGames.length; i++) {
      let g = {
        title: brentGames[i].name,
        publisher: brentGames[i].publishers.length
          ? brentGames[i].publishers.map((el) => el.name).join(", ")
          : "Epic Games, People Can Fly",
        developer: brentGames[i].developers.map((el) => el.name).join(", "),
        releaseDate: brentGames[i].released,
        description: brentGames[i].description_raw,
        overallRating: brentGames[i].rating,
        imageHref: brentsHrefs[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      brentFinalArray.push(g);
    }

    games.push(...brentFinalArray);

    const newGames = results.map((game) => {
      return {
        title: game.name,
        publisher: "Sony Interactive Entertainment",
        developer: "Sony",
        releaseDate: game.released,
        description: game.name,
        overallRating: game.rating,
        imageHref: game.background_image,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    games.push(...newGames);

    options.tableName = "Games";
    return queryInterface.bulkInsert(options, games, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Games";
    return queryInterface.bulkDelete(options, null, {});
  },
};
