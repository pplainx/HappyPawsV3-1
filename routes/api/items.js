const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Private
router.get('/', auth, (req, res) => {
  Item.find({
    userId: req.user.id
  })
    .sort({ date: -1 })
    .then(items => {
      console.log(items)
      res.json(items)

    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    });
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    breed: req.body.breed,
    weight: req.body.weight,
    age: req.body.age,
    image: req.body.image,
    userId: req.user.id
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
