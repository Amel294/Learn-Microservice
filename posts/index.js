const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    if (!title) {
        return res.status(400).send({ error: 'Title is required' });
    }

    posts[id] = {
        id,
        title,
    };

    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
