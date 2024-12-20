// this is the entry point that node.js will call when the web service is run
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
// const { peerProxy, broadcast, connections } = require('./peerProxy.js');
const { peerProxy } = require('./peerProxy.js');


const authCookieName = 'token';

// service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// json body parsing using build in middleware
app.use(express.json());

// cookie parser middleware for tracking auth tokens
app.use(cookieParser());

// serve up front end static content hosting
app.use(express.static('public'));

// trust headers that are forwarded from proxy so we can determine IPs
app.set('trust proxy', true);

// router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);



// SERVICE ENDPOINTS
// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    try {
        // Check if the user already exists
        if (await DB.getUser(req.body.email)) {
            return res.status(409).send({ msg: 'Existing user' });  // Send a JSON response with an error message
        }

        // Create the user
        const user = await DB.createUser(req.body.email, req.body.password);
        
        // Set authentication cookie
        setAuthCookie(res, user.token);

        // Send back the user ID as a response
        return res.json({ id: user._id });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).send({ msg: 'Internal Server Error' });  // Send a JSON response with an error
    }
});

// GetAuth token for provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'unauthorized' });
    }
});


// GetItems for the authenticated user
secureApiRouter.get('/items', async (req, res) => {
    try {
        const items = await DB.getItems(); //fetch all items
        res.send(items);
    } catch (error) {
        console.error('error retrieving items', error);
        res.status(500).send({ msg: 'error retrieving items' });
    }
});

// AddItem
secureApiRouter.post('/item', async (req, res) => {
    const newItem = await DB.addItem(req.body);
    try {
        // const newItem = await DB.addItem(req.body);
        const items = await DB.getItems();
        // broadcast(connections, { type: 'item-added', item: newItem });
        // console.log('broadcasting new item: ', newItem)
        res.status(201).send(items);
    } catch (error) {
        console.error('error adding item', error);
        res.status(500).send({ msg: 'error adding item' });
    }
});

// UpdateItem (change done to true or false)
secureApiRouter.put('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedItem = await DB.updateItem(id);
        if (!updatedItem) {
            return res.status(404).send({ msg: 'item not found' });
        }
        const items = await DB.getItems();
        res.send(items);
    } catch (error) {
        console.error('error updating item', error);
        res.status(500).send({ msg: 'error updating item' });
    }
});



// DeleteItem
secureApiRouter.delete('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await DB.deleteItem(id);
        const items = await DB.getItems();
        // if (success) {
        //     broadcast(connections, { type: 'item-deleted', id });
        // }
        res.send(items);
    } catch (error) {
        console.error('error deleting item', error);
        res.status(500).send({ msg: 'error deleting item' });
    }
});

// default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// if path is unknown return default page
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in http resp
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const httpService = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

peerProxy(httpService);
