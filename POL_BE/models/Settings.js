const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    showScrollingHeadline: {
      type: Boolean,
      default: true,
    },
    showSidebar: {
      type: Boolean,
      default: false,
    },
    enableTicketing: {
      type: Boolean,
      default: false,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    headlines: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

settingsSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Ensure singleton pattern
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);
