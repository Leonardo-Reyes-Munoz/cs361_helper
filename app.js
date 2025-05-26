const zmq = require('zeromq');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3050;

app.use(cors());

app.get('/api/v1/reviews', async (req, res) => {
  try {
    const sock = new zmq.Request();

    sock.connect('tcp://127.0.0.1:5555');
    console.log('Connected to ZMQ Server at PORT 5555');

    await sock.send('1');
    const [result] = await sock.receive();

    const reviews = JSON.parse(result.toString());
    res.json(reviews);
  } catch (err) {
    console.log(`There was an error with ZMQ server: ${err}`);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on PORT 3050...`);
});
