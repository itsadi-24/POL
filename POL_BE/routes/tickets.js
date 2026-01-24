const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/tickets
// @desc    Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tickets/:id
// @desc    Get single ticket by ID or ticketId
router.get('/:id', async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      ticket = await Ticket.findOne({ ticketId: req.params.id });
    }
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/tickets
// @desc    Create a new ticket
router.post('/', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/tickets/:id
// @desc    Update a ticket
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      ticket = await Ticket.findOne({ ticketId: req.params.id });
    }
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    Object.assign(ticket, req.body);
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PATCH /api/tickets/:id
// @desc    Partially update a ticket
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      ticket = await Ticket.findOne({ ticketId: req.params.id });
    }
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    Object.assign(ticket, req.body);
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/tickets/:id
// @desc    Delete a ticket
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      ticket = await Ticket.findOneAndDelete({ ticketId: req.params.id });
    }
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
