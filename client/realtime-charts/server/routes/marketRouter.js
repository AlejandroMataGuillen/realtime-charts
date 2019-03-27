const router = require('express').Router();
const market = require('../market');

router.get('/', (req, res) => {
  res.send(market.marketPositions);
  createInterval(res.io);
});

const createInterval = (io) => {
  setInterval(() => {
    market.updateMarket();
    io.sockets.emit('market', market.marketPositions[0]);
  }, 2000);
}

module.exports = router;
