const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items 
// @access  Public 
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create a new item
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save()
    .then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.remove()
        .then(() => res.json({success: true, message: "item deleted"}))
        .catch(err => res.status(404).json({success: false, message: "item was not deleted"}));
    })
    .catch(err => res.status(404).json({succes: false, message: "item not found"}));
});

module.exports = router;