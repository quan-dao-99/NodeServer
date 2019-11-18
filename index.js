'use strict';

const express = require('express');
const connection = require('./model/db');

const app = express();

app.use(express.static('public'));

app.get('/animals', async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM animal');
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (e) {
        console.log(e);
        res.send('db error :(');
    }
});

app.get('/animal', async (req, res) => {
    console.log(req.query);
    try {
        const [results] = await  connection.query(
            'SELECT * FROM animal WHERE name LIKE ?',
            [req.query.name]
        );
        res.json(results);
    } catch (e) {
        res.send(`db error ${e}`);
    }
});

app.get('/', (req, res) => {
    res.send('Hello from my Node Server');
});

app.get('/demo', (req, res) => {
    console.log('request', req);
    res.send('demo');
});

app.listen(3000, () => {
    console.log('Server app start?');
});