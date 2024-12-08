const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, {tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily:false, });
const db = client.db('grocereaseLive');
const userCollection = db.collection('user');
const itemCollection = db.collection('item');

// asynchronously test the connection and exit the process if fail
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`can't to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(email){
    return userCollection.findOne({ email: email });
}

function getUserByToken(token){
    return userCollection.findOne({ token: token });
}

async function createUser(email, password){
    // hash password so its not in plaintext in db
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user;
}

async function addItem(item) {
    const newItem = {
        id: uuid.v4(),
        text: item.text,
        done: item.done || false,
    };
    // insert item into collection
    await itemCollection.insertOne(newItem);
    return newItem;
}

async function getItems(){
    // retrieve all items from collection
    const items = await itemCollection.find({}).toArray();
    return items;
}

async function updateItem(itemId) {
    // find item
    const item = await itemCollection.findOne({ id: itemId });
    if (!item) {
        return null; //item not found
    }
    //toggle done field
    const updatedItem = await itemCollection.findOneAndUpdate(
        { id: itemId }, // match item by id and ownership
        { $set: { done: !item.done } }, // toggle done
        { returnDocument: 'after' } //return updated item
    );
    return updatedItem;
}

async function deleteItem(itemId) {
    const result = await itemCollection.deleteOne({
        id: itemId,
    });
    // return true if item was deleted
    return result.deletedCount > 0;
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addItem,
    getItems,
    updateItem,
    deleteItem,
};
