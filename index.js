
require('dotenv').config();
const express = require('express');
const Cocktail = require('./models/cocktails.js');
const Liquor = require('./models/liquors.js');
const app = express();
app.use(express.json());


app.post('/liquors', async (req, res) => {
    Liquor
        .insert(req.body)
        .then(liquor => res.send(liquor));
});


app.get('/liquors', async (req, res) => {
    Liquor
        .find()
        .then(liquor => res.send(liquor));

});

app.get('/liquors/:id', async (req, res) => {
    Liquor
        .findById(req.params.id)
        .then(liquor => res.send(liquor));

});

app.put('/liquors/:id', async (req, res) => {
    Liquor
        .update(req.params.id, req.body)
        .then(liquor => res.send(liquor));
});

app.delete('/liquors/:id', async (req, res) => {
    Liquor
        .delete(req.params.id)
        .then(liquor => res.send(liquor));
});
app.post('/cocktails', async (req, res) => {
    Cocktail
        .insert(req.body)
        .then(cocktail => res.send(cocktail));
});


app.get('/cocktails', async (req, res) => {
    Cocktail
        .find()
        .then(cocktail => res.send(cocktail));

});

app.get('/cocktails/:id', async (req, res) => {
    Cocktail
        .findById(req.params.id)
        .then(cocktail => res.send(cocktail));

});

app.put('/cocktails/:id', async (req, res) => {
    Cocktail
        .update(req.params.id, req.body)
        .then(cocktail => res.send(cocktail));
});

app.delete('/cocktails/:id', async (req, res) => {
    Cocktail
        .delete(req.params.id)
        .then(cocktail => res.send(cocktail));
});

module.exports = app;
