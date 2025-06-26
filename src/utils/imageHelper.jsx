export function getCorrectImage(game) {
  const imageFixMap = {
    1: "/img/God of War.jpg",
    2: "/img/God-of-War-Ragnarok.jpg",
    3: "/img/The-Last-Of-Us.jpg",
    4: "/img/Red Dead Redemption.jpg",
    5: "/img/Red-Dead-Redemption-2.jpg",
    6: "/img/The-Last-Of-Us-2.jpg",
    7: "/img/Assassin's-Creed-Valhalla.jpg",
    8: "/img/Spiderman.jpg",
    9: "/img/Sons-Of-The-Forest.jpg",
    10: "/img/GTA-5.jpg",
    11: "/img/Ghost-of-Tsushima.jpg",
    12: "/img/The-Witcher-3.jpg",
  };

  return imageFixMap[game.id] || game.imageUrl || "/img/placeholder.jpg";
}
