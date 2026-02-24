const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving habits" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving habit" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newHabit = new Habit({ title, description });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(400).json({ message: "Error creating habit" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: "Error updating habit" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting habit" });
  }
});

module.exports = router;
