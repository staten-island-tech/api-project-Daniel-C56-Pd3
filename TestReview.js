/*const PCgames = videoGames.filter(game => game.platforms === 'PC');
const topGames = videoGames.filter(game => game.rating.metacritic > 90);
if (game.platforms === 'PC' && game.rating.metacritic > 90);
  console.log(game.title);*/

/*const Newgames = videoGames.filter(game => game.yearReleased >= 2018);
Newgames.forEach(game => {
    console.log(game.title);
});*/

const OpenWorldGames = videoGames.filter(game => game.genres.includes('Open World'));
OpenWorldGames.forEach(game => {
    console.log(game.title);
});