// this is the entry point that node.js will call when the web service is run
const express = require('express');
const uuid = require('uuid');
const app = express();

// memory data structs. users and items are saved in memory and disappear whenever the service is restarted
let users = {};
let items = [];

// service port. in production the front end code is statically hosted by service on same port
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// json body parsing using build in middleware
app.use(express.json());

// router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);



// SERVICE ENDPOINTS
// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
        users[user.email] = user;
        res.send({ token: user.token });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
        if (req.body.password === user.password) {
            user.token = uuid.v4();
            res.send({ token: user.token });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
        delete user.token;
    }
    res.status(204).end();
});

// GetItems
apiRouter.get('/items', (_req, res) => {
    res.send(items);
});

// AddItem
apiRouter.post('/item', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (!user) {
        return res.status(401).send({ msg: 'not logged in' });
    }

    if (!req.body.Text) {
        return res.status(400).send({ msg: 'text is required' })
    }

    items = updateItems(req.body, items, user);
    res.send(items);
});

// return app's default page if path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateItems adds an item to the grocery list
function updateItems(newItem, items, user) {
    // generate a unique ID for the new item
    const itemId = uuid.v4();

    // create item object
    const item = {
        _id: itemId,
        UserId: user.email,
        Text: newItem.Text,
        Done: newItem.Done || false
    };

    // add new item to item array
    items.push(item);
    return items;
}
