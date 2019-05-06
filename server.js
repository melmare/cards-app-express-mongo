const express = require('express');
const mongoose = require('mongoose');
const Card = require('./models/Card');

mongoose
  .connect('mongodb://localhost:27017/cards-app-express-mongo', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(express.static('./dist'));

app.listen(3000, err => {
  err ? console.log(err) : console.log('Server ready');
});

app.get('/cards', (req, res) => {
  Card.find() //Card.find({ order: { $gt: 3 } })
    .then(cards => res.status(200).json(cards))
    .catch(err => res.status(500).json({ errors: [err] }));
});

app.get('/cards/:id', (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .then(card => res.status(200).json(card))
    .catch(err => res.status(500).json(err));
});

app.delete('/cards/:id', (req, res) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then(card => res.status(202).json(card))
    .catch(err => res.status(500).json(err));
});

app.post('/cards', (req, res) => {
  Card.create(req.body)
    .then(card => res.status(201).json(card))
    .catch(err => res.status(500).json(err));
});

app.patch('/cards/:id', (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, req.body, { new: true })
    .then(card => res.json(card))
    .catch(err => res.json(err));
});
