const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

const marketRouter = require('./routes/marketRouter');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  res.io = io
  next()
});

app.use('/api/market', marketRouter);

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
