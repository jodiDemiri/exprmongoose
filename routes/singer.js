const express = require('express')
const router = express.Router()
const Singer = require('../models/singers')

// Getting all
router.get('/', async (req, res) => {
  try {
    const Singers = await Singer.find()
    res.json(Singers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSinger, (req, res) => {
  res.json(res.Singer)
})

// Creating one
router.post('/', async (req, res) => {
  const singer = new Singer({
    name: req.body.name,
    phone: req.body.phone,
    part: req.body.part,
    status: req.body.status
  })
  try {
    const newSinger = await singer.save()
    res.status(201).json(newSinger)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getSinger, async (req, res) => {
  if (req.body.name != null) {
    res.Singer.name = req.body.name
  }
  if (req.body.phone != null) {
    res.Singer.phone = req.body.phone
  }
  if (req.body.part != null) {
    res.Singer.part = req.body.part
  }
  if (req.body.status != null) {
    res.Singer.status = req.body.status
  }
  try {
    const updatedSinger = await res.Singer.save()
    res.json(updatedSinger)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSinger, async (req, res) => {
  try {
    await res.Singer.remove()
    res.json({ message: 'Deleted Singer' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSinger(req, res, next) {
  let Singer
  try {
    Singer = await Singer.findById(req.params.id)
    if (Singer == null) {
      return res.status(404).json({ message: 'Cannot find Singer' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.Singer = Singer
  next()
}

module.exports = router