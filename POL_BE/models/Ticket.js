const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    customer: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
    date: {
      type: String,
    },
    comment: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate ticketId
ticketSchema.pre('save', async function (next) {
  if (!this.ticketId) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketId = `TCK-${1000 + count + 1}`;
  }
  if (!this.date) {
    this.date = new Date().toISOString().split('T')[0];
  }
  next();
});

ticketSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret.ticketId;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
